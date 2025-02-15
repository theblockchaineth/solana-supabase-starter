import { createClient } from "./supabase/supabaseServerSide"; 

async function getPageData() {
    const supabase = await createClient()
    const userdata = await supabase.from('wallets').select();
    const data = userdata?.data
    if(data) return data[0]
    return null
}

export default async function Splash() {

    const pageData = await getPageData();
    console.log(pageData);
    
    return (
        <div className="flex items-center justify-center h-screen">
        <div className="text-3xl font-bold">Welcome to the Splash Page</div> </div>
    );
    }