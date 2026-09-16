declare global {
    namespace JSX {
        interface IntrinsicElements {
            [elementName: string]: any;
        }
    }
}

export default function Account() {
    return <main className="container-x py-16">
        <h1 className="text-4xl font-bold ">My Account</h1>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
            {
            ["Personal Information",
                "My Orders","Addresses",
                "Wishlist",
                "Payments",
                "Coupons",
                "Reviews",
                "Notifications",
                "Settings"]
                .map(x=>
                <div className="card p-6" key={x}
                ><h2 className="font-semibold">{x}
                </h2><p className="mt-2 text-sm text-white/40">
                Manage your {x.toLowerCase()}
                .</p></div>)}</div></main>}