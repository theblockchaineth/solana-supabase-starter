import { createClient } from "./supabase/supabaseServerSide";

async function getPageData() {
    const supabase = await createClient()
    const userdata = await supabase.from('wallets').select();
    const data = userdata?.data
    if (data) return data[0]
    return null
}

export default async function Splash() {

    const pageData = await getPageData();

    return (
        <div className="flex items-center justify-center h-screen">
            {
                pageData ?
                    <div>
                        <h1 className="text-2xl font-bold">Supabase Data</h1>
                        <p className="text-md">{JSON.stringify(pageData)}</p>
                    </div>
                    :
                    <p>No Data - If you have authenticated, refresh the page to get supabase data (if available) via a server side render</p>
            }
        </div>
    );
}