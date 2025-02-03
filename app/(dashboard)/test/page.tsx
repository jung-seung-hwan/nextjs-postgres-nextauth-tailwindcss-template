// import {
//     Card,
//     CardContent,
//     CardDescription,
//     CardHeader,
//     CardTitle
//   } from '@/components/ui/card';
  
//   export default function CustomersPage() {
//     return (
//       <Card>
//         <CardHeader>
//           <CardTitle>Customers</CardTitle>
//           <CardDescription>View all customers and their orders.</CardDescription>
//         </CardHeader>
//         <CardContent></CardContent>
//       </Card>
//     );
//   }
  

// import VueWrapper from "../../../src/components/VueWrapper";

// function App() {
//   return (
//     <div>
//       <h1>React App</h1>
//       <VueWrapper /> {/* Vue.js 2 + Vuetify 2 컴포넌트 렌더링 */}
//     </div>
//   );
// }

// export default App;


import VueWrapper from "../../../src/components/VueWrapper";

export default function TestPage() {
  return (
    <div>
      <h1>Vue.js 2 UI in Next.js</h1>
      <VueWrapper />
    </div>
  );
}
