// import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";


// export default function(req, res) {
//     const supabaseServerClient = createServerSupabaseClient({
//         req,
//         res,
//     })
//     try{}
//     const {
//         data: { user },
//     } = await supabaseServerClient.auth.getUser()

//     res.status(200).json({ name: user?.name ?? '' })
// }