import Gauge from "@/lib/gauge";

export default function GaugeGroup(props: {}) {
    return (
        <div className="flex flex-col gap-4 w-full">
            <Gauge title="애정도" value={80} />
            <Gauge title="배고픔" value={20} />
            <Gauge title="체력" value={40} />
        </div>
    )
}