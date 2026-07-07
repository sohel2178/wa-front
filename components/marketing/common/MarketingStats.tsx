// "use client";

// import { useEffect, useState } from "react";
// import { CheckCircle2, FileText, ShieldCheck, ShieldX } from "lucide-react";

// import { Card, CardContent } from "@/components/ui/card";
// import { getTemplateStatistics } from "@/lib/marketing-api";
// import { TemplateStatistics } from "@/types/meta-template";

// const initialStatistics: TemplateStatistics = {
//   total: 0,
//   active: 0,
//   approved: 0,
//   rejected: 0,
//   disabled: 0,
//   paused: 0,
//   pending: 0,
// };

// export default function MarketingStats() {
//   const [statistics, setStatistics] =
//     useState<TemplateStatistics>(initialStatistics);

//   const [loading, setLoading] = useState(true);

//   const loadStatistics = async () => {
//     try {
//       setLoading(true);

//       const data = await getTemplateStatistics();

//       setStatistics(data);
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadStatistics();
//   }, []);

//   const cards = [
//     {
//       title: "Templates",
//       value: statistics.total,
//       icon: FileText,
//     },
//     {
//       title: "Approved",
//       value: statistics.approved,
//       icon: CheckCircle2,
//     },
//     {
//       title: "Active",
//       value: statistics.active,
//       icon: ShieldCheck,
//     },
//     {
//       title: "Disabled",
//       value: statistics.disabled,
//       icon: ShieldX,
//     },
//   ];

//   return (
//     <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
//       {cards.map((card) => (
//         <Card key={card.title}>
//           <CardContent className="flex items-center justify-between p-6">
//             <div>
//               <p className="text-sm text-muted-foreground">{card.title}</p>

//               <h2 className="mt-2 text-3xl font-bold">
//                 {loading ? "..." : card.value}
//               </h2>
//             </div>

//             <card.icon className="h-9 w-9 text-muted-foreground" />
//           </CardContent>
//         </Card>
//       ))}
//     </div>
//   );
// }

"use client";

import { CheckCircle2, FileText, ShieldCheck, ShieldX } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { TemplateStatistics } from "@/types/meta-template";

interface Props {
  statistics: TemplateStatistics;

  loading: boolean;
}

export default function MarketingStats({ statistics, loading }: Props) {
  const cards = [
    {
      title: "Templates",
      value: statistics.total,
      icon: FileText,
    },
    {
      title: "Approved",
      value: statistics.approved,
      icon: CheckCircle2,
    },
    {
      title: "Active",
      value: statistics.active,
      icon: ShieldCheck,
    },
    {
      title: "Disabled",
      value: statistics.disabled,
      icon: ShieldX,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.title}>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-muted-foreground">{card.title}</p>

              <h2 className="mt-2 text-3xl font-bold">
                {loading ? "..." : card.value}
              </h2>
            </div>

            <card.icon className="h-8 w-8 text-muted-foreground" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
