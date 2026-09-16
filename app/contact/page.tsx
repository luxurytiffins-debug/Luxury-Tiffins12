export default function Contact(){return <main className="container-x max-w-3xl py-16">
    <h1 className="text-5xl font-bold">Contact us.
        </h1>
        <form 
        className="card mt-8 grid gap-4 p-6">
            {
            ["Name","Email","Phone","Subject"]
            .map(x=><input key={x} placeholder={x} 
                className="rounded-xl border border-white/10 bg-black p-3"/>)
                }
                <textarea placeholder="Message" rows={6}
                className="rounded-xl border border-white/10 bg-black p-3"/>
                <button className="gold-bg rounded-full p-3 font-semibold">
                    Send message</button>
                    </form>
                    </main>
}