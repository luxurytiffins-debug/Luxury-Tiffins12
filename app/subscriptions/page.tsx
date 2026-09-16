const plans=[
    ["Weekly","7 meals","₹1,299"],
    ["Monthly","30 meals","₹4,999"],
    ["Premium Monthly","Premium meals + benefits",
        "₹6,999"]
    ];
export default function Subscriptions()
{
    return <main className="container-x py-16">
        <p className="gold text-xs uppercase tracking-[0.3em]">
            Subscriptions</p>
            <h1 className="mt-3 text-5xl font-bold">
                Make luxury a routine.</h1>
                <div className="mt-10 grid gap-5 md:grid-cols-3">
                    {plans.map(p=><div className="card p-7" key={p[0]

                    }>
                        <h2 className="text-2xl font-semibold">{p[0]
                            }</h2>
                        <p className="mt-3 text-white/50">{p[1]
                        }</p>
                        <div className="gold mt-7 text-3xl font-bold">
                            {p[2]}</div><a href="/checkout" className="gold-bg mt-7 block rounded-full py-3 text-center font-semibold">Choose plan</a>
                            </div>
                            )
                            }
                            </div>
                            </main>;
                            }