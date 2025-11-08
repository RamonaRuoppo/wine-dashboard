import { Info } from "lucide-react";
import Card from "./card/Card";
import CardHeader from "./card/CardHeader";
import CardBody from "./card/CardBody";
import CardFooter from "./card/CardFooter";

function SummaryCard({
    title,
    subtitle,
    icon,
    info,
    value,
    unit,
    color,
    progress,
    historicValue,
    variation,
    diff,
    diffIcon,
    diffColor,
    badgeText,
    badgeColor,
    badgeBg,
    badgeBorder,
}) {
    return (
        <Card className="p-6 bg-white hover:shadow-lg transition-shadow">
            <CardHeader
                title={title}
                subtitle={subtitle}
                icon={icon}
                info={info}
            />
            <CardBody
                value={value}
                unit={unit}
                color={color}
                historicValue={historicValue}
                variation={variation}
                diff={diff}
                diffIcon={diffIcon}
                diffColor={diffColor}
            />
            <CardFooter
                progress={progress}
                badgeText={badgeText}
                badgeColor={badgeColor}
                badgeBg={badgeBg}
                badgeBorder={badgeBorder}
            />


        </Card>
    );
}

export default SummaryCard;