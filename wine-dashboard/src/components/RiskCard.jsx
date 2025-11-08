import Card from "./card/Card";
import CardHeader from "./card/CardHeader";

function RiskCard() {
    return (

        <Card className="p-6 bg-white hover:shadow-lg transition-shadow">
            <CardHeader 
                title={title}
                subtitle={subtitle}
                icon={icon}
                info={info}
            />
        </Card>
    );
}

export default RiskCard;