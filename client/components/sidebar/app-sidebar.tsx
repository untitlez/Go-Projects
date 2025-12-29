// "use client";

// import { useEffect } from "react";
// import { LockKeyhole, User2 } from "lucide-react";

// import { Routes } from "@/lib/routes";
// import { useStoreAuth } from "@/lib/use-client/store/store-auth";
// import { useSession } from "@/lib/use-client/hook/use-auth";

// import { SidebarProvider } from "@/components/ui/sidebar";
// import { SidebarInset } from "@/components/ui/sidebar";
// import { SidebarHeader } from "@/components/sidebar/sidebar-header";
// import { SidebarLeft } from "@/components/sidebar/sidebar-left";
// // import { SidebarRight } from "@/components/sidebar/sidebar-right";

// interface AppSideBarProps {
//   children: React.ReactNode;
// }

// export const AppSideBar = ({ children }: AppSideBarProps) => {
//   const { authorization } = useStoreAuth();
//   const { session, getSession } = useSession();

//   useEffect(() => {
//     getSession();
//   }, [authorization]);

//   const menuItems = [
//     {
//       title: "authentication",
//       icon: LockKeyhole,
//       isActive: true,
//       items: [
//         {
//           title: "sign up",
//           url: Routes.auth.signup,
//         },
//         {
//           title: "sign in",
//           url: Routes.auth.signin,
//         },
//       ],
//     },
//     {
//       title: "account profile",
//       icon: User2,
//       isActive: true,
//       items: [
//         {
//           title: "all account",
//           url: Routes.profile.all,
//           require: authorization,
//         },
//         {
//           title: "profile",
//           url: Routes.profile.list + session?.id,
//           require: authorization,
//         },
//       ],
//     },
//     // {
//     //   title: "leave system",
//     //   icon: NotebookPen,
//     //   isActive: true,
//     //   items: [
//     //     {
//     //       title: "link demo",
//     //       url: Routes.external.hr_project,
//     //     },
//     //   ],
//     // },
//   ];

//   return (
//     <SidebarProvider>
//       <SidebarLeft menuItems={menuItems} />
//       <SidebarInset className="my-2 mx-4 overflow-x-hidden">
//         <SidebarHeader id={session?.id} />
//         <div className="flex flex-1 flex-col gap-4">
//           <div className="w-full rounded-xl px-8 py-16 justify-items-center">
//             {children}
//           </div>
//         </div>
//       </SidebarInset>
//       {/* <SidebarRight className="py-4 mr-2"/> */}
//     </SidebarProvider>
//   );
// };
