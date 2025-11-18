import { AlignCenter } from "lucide-react";
import Card from "./card/Card";
import CardHeader from "./card/CardHeader";
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';

function classifyRisk(value) {
    if (value < 30) return { level: "Basso", color: "green" };
    if (value < 70) return { level: "Medio", color: "yellow" };
    return { level: "Alto", color: "red" };
}

function RiskCard({ title, subtitle, icon, info, value, diseases }) {
    const { level, color } = classifyRisk(value);
    return (
        <Card className="p-6 bg-white dark:border-gray-700 dark:bg-gray-800 hover:shadow-lg transition-shadow">
            <CardHeader
                title={title}
                subtitle={subtitle}
                icon={icon}
                info={info}
            />

            <div style={{ width: 100, height: 100 }}>
                <CircularProgressbar className="mb-4 mt-4"
                    value={value}
                    text={value + "%"}
                    styles={buildStyles({
                        rotation: 0.25,
                        strokeLinecap: 'butt',
                        pathTransitionDuration: 0.5,
                        textSize: "16px",
                        pathColor: value < 30 ? "green" : value < 70 ? "orange" : "red",
                        textColor: "#333",
                        trailColor: "#eee",
                    })}
                />
            </div>

            {/* Badge rischio */}
            <span
                className={`inline-block mt-2 px-2 py-1 text-xs font-semibold rounded-full border 
                ${level === "Basso" ? "bg-green-100 text-green-800 border-green-300" : ""}
                ${level === "Medio" ? "bg-yellow-100 text-yellow-800 border-yellow-300" : ""}
                ${level === "Alto" ? "bg-red-100 text-red-800 border-red-300" : ""}`}
            >
                Rischio {level}
            </span>

            {/* Malattie associate */}
            {diseases && (
                <p className="text-xs text-gray-500 mt-2 text-center">{diseases}</p>
            )}
        </Card>
    );
}

export default RiskCard;