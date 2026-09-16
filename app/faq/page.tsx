const faqs=
[
    ["How does delivery work?",
        "Choose a delivery address and available delivery option during checkout."],
        ["Can I subscribe?",
            "Yes. Weekly, monthly and premium monthly plans are supported by the application architecture."
        ],
        [
            "Are payments secure?",
            "Payment verification is performed server-side and card data is not stored by Luxury Tiffins."
        ]
    ];
     export default function FAQ()
     {
        return <main className="container-x max-w-4xl py-16">
            <h1 className="text-5xl font-bold">Frequently Asked Questions</h1>
            <div className="mt-10 space-y-3">
                {faqs.map(x=><details className="card p-5" key={x[0]}>
                    <summary className="cursor-pointer font-semibold">
                        {x[0]}</summary><p className="mt-3 text-white/60">{x[1]}
                        </p>
                        </details>
                        )
                        }
                        </div>
                        </main>
                        }