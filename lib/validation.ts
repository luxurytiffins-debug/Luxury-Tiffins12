type Schema<T = unknown> = {
  parse: (value: unknown) => T;
  safeParse: (
    value: unknown
  ) => {
    success: boolean;
    data?: T;
    error?: {
      issues: Array<{ message: string }>;
    };
  };
  min: (length: number) => Schema<T>;
  max: (length: number) => Schema<T>;
  regex: (pattern: RegExp) => Schema<T>;
  optional: () => Schema<T | undefined>;
};

type InferSchema<T> = T extends Schema<infer U> ? U : never;

type ObjectOutput<T extends Record<string, Schema<any>>> = {
  [K in keyof T]: InferSchema<T[K]>;
};

const makeStringSchema = (
  options: {
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    email?: boolean;
  } = {}
): Schema<string> => {
  const parse = (value: unknown): string => {
    if (typeof value !== "string") {
      throw new Error("Expected a string");
    }

    if (
      options.minLength !== undefined &&
      value.length < options.minLength
    ) {
      throw new Error(
        `String must be at least ${options.minLength} characters long`
      );
    }

    if (
      options.maxLength !== undefined &&
      value.length > options.maxLength
    ) {
      throw new Error(
        `String must be at most ${options.maxLength} characters long`
      );
    }

    if (options.pattern && !options.pattern.test(value)) {
      throw new Error("String format is invalid");
    }

    if (
      options.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    ) {
      throw new Error("Invalid email address");
    }

    return value;
  };

  const schema: Schema<string> = {
    parse,

    safeParse: (value: unknown) => {
      try {
        return {
          success: true,
          data: parse(value),
        };
      } catch (error) {
        return {
          success: false,
          error: {
            issues: [
              {
                message:
                  error instanceof Error
                    ? error.message
                    : "Validation failed",
              },
            ],
          },
        };
      }
    },

    min: (length: number) =>
      makeStringSchema({
        ...options,
        minLength: length,
      }),

    max: (length: number) =>
      makeStringSchema({
        ...options,
        maxLength: length,
      }),

    regex: (pattern: RegExp) =>
      makeStringSchema({
        ...options,
        pattern,
      }),

    optional: () =>
      makeOptionalSchema(schema),
  };

  return schema;
};

const makeOptionalSchema = <T>(
  inner: Schema<T>
): Schema<T | undefined> => {
  const parse = (value: unknown): T | undefined =>
    value === undefined ? undefined : inner.parse(value);

  return {
    parse,

    safeParse: (value: unknown) => {
      if (value === undefined) {
        return {
          success: true,
          data: undefined,
        };
      }

      return inner.safeParse(value);
    },

    min: () => makeOptionalSchema(inner),
    max: () => makeOptionalSchema(inner),
    regex: () => makeOptionalSchema(inner),
    optional: () => makeOptionalSchema(inner),
  };
};

const z: {
  string: () => Schema<string>;
  email: () => Schema<string>;
  object: <T extends Record<string, Schema<any>>>(
    shape: T
  ) => Schema<ObjectOutput<T>>;
} = {
  string: () => makeStringSchema(),
  email: () => makeStringSchema({ email: true }),
  object: <T extends Record<string, Schema<any>>>(shape: T) => {
    const parse = (value: unknown): ObjectOutput<T> => {
      if (!value || typeof value !== "object" || Array.isArray(value)) {
        throw new Error("Expected an object");
      }

      const result = {} as ObjectOutput<T>;
      for (const key of Object.keys(shape) as Array<keyof T>) {
        result[key] = shape[key].parse(
          (value as Record<string, unknown>)[String(key)]
        ) as ObjectOutput<T>[keyof T];
      }
      return result;
    };

    const safeParse = (value: unknown) => {
      try {
        return { success: true, data: parse(value) };
      } catch (error) {
        return {
          success: false,
          error: {
            issues: [{
              message: error instanceof Error ? error.message : "Validation failed",
            }],
          },
        };
      }
    };

    const unsupported = () => {
      throw new Error("This method is not supported on object schemas");
    };

    const schema: Schema<ObjectOutput<T>> = {
      parse,
      safeParse,
      min: unsupported,
      max: unsupported,
      regex: unsupported,
      optional: () => makeOptionalSchema(schema),
    };
    return schema;
  },
};

export const registerSchema = z.object({
  name: z.string().min(2),
  email: z.email(),
  password: z.string().min(8),
  phone: z.string().min(10).max(15),
});

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
});

export const addressSchema = z.object({
  house: z.string().min(1),
  street: z.string().min(1),
  area: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(1),
  pincode: z.string().regex(/^\d{6}$/),
  landmark: z.string().optional(),
  instructions: z.string().optional(),
});