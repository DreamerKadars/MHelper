import { ClassAtk, ClassCC, ClassCD, ClassDefend, ClassHp, ClassSpeed, ClassHr, ClassRr, ClassAtkPercent, ClassDefendPercent, ClassHpPercent, Equipment } from "../../utils/const";
import { Pie } from 'react-chartjs-2';

// 85等级的分段
const levelGrade90 = [60, 63, 65, 68, 70, 73, 1000]
const levelGrade85 = [50, 53, 55, 58, 60, 63, 1000]
interface EquipmentPieChartProps {
    mode: string;
    equip: Equipment;
}

export const GetTotalGrade = (item: Equipment) => {
    const speedGrade = item.Speed * 2
    const atkGrade = item.Atk / 9
    const defendGrade = item.Defend / 6
    const hpGrade = item.Hp / 50
    const atkPercentGrade = item.AtkPercent
    const defendPercentGrade = item.DefendPercent
    const hpPercentGrade = item.HpPercent
    const ccGrade = item.CC * 1.5
    const cdGrade = item.CD * 1.1
    const hrGrade = item.Hr
    const rrGrade = item.RR
    return speedGrade + atkGrade + defendGrade + hpGrade + atkPercentGrade + defendPercentGrade + hpPercentGrade + ccGrade + cdGrade + hrGrade + rrGrade
}
export const CalEquipNum = (equip: Equipment) => {
    let subNum = 0 // 计算副属性的数量，不应该大于4个
    let subValueList = [equip.CC, equip.CD, equip.Atk, equip.Speed, equip.AtkPercent, equip.Hp, equip.HpPercent, equip.RR, equip.Hr, equip.Defend, equip.DefendPercent]
    subValueList.map((value) => { 
        if (value !== 0) {
            subNum++;
        }
    })
    return subNum
}
export const PieChart = (props: EquipmentPieChartProps) => {
    let totalGrade = GetTotalGrade(props.equip)
    let grade: number[] = Array<number>(500)
    let gradeTemp: number[] = Array<number>(500)
    for (let i = 0; i < 100; i++) {
        grade[i] = 0
        gradeTemp[i] = 0
    }
    if (totalGrade > 100) {
        return <div></div>
    }
    grade[Math.round(totalGrade)] = 100.00
    let upgradeTime = Math.floor((17 - props.equip.UpgradeLevel) / 3)
    if (upgradeTime < 0 || upgradeTime > 5) {
        return <div></div>
    }
    

    let subNum = CalEquipNum(props.equip)
    let oneValuePercent = subNum === 0 ? 0.25 : 1 / subNum
    if (props.equip.Level == 85) {
        for (let i = 0; i < upgradeTime; i++) {
            
            // if (i>0){
            //     break;
            // }
            for (let j = 0; j < 100; j++) {
                if (props.equip.Atk !== 0) {
                    gradeTemp[j + 4] = gradeTemp[j + 4] + oneValuePercent * 0.5 * grade[j]
                    gradeTemp[j + 5] = gradeTemp[j + 5] + oneValuePercent * 0.5 * grade[j]
                }
                if (props.equip.AtkPercent !== 0) {
                    gradeTemp[j + 4] = gradeTemp[j + 4] + oneValuePercent * 0.2 * grade[j]
                    gradeTemp[j + 5] = gradeTemp[j + 5] + oneValuePercent * 0.2 * grade[j]
                    gradeTemp[j + 6] = gradeTemp[j + 6] + oneValuePercent * 0.2 * grade[j]
                    gradeTemp[j + 7] = gradeTemp[j + 7] + oneValuePercent * 0.2 * grade[j]
                    gradeTemp[j + 8] = gradeTemp[j + 8] + oneValuePercent * 0.2 * grade[j]
                }
                if (props.equip.Defend !== 0) {
                    gradeTemp[j + 5] = gradeTemp[j + 5] + oneValuePercent * 0.5 * grade[j]
                    gradeTemp[j + 6] = gradeTemp[j + 6] + oneValuePercent * 0.5 * grade[j]
                }
                if (props.equip.DefendPercent !== 0) {
                    gradeTemp[j + 4] = gradeTemp[j + 4] + oneValuePercent * 0.2 * grade[j]
                    gradeTemp[j + 5] = gradeTemp[j + 5] + oneValuePercent * 0.2 * grade[j]
                    gradeTemp[j + 6] = gradeTemp[j + 6] + oneValuePercent * 0.2 * grade[j]
                    gradeTemp[j + 7] = gradeTemp[j + 7] + oneValuePercent * 0.2 * grade[j]
                    gradeTemp[j + 8] = gradeTemp[j + 8] + oneValuePercent * 0.2 * grade[j]
                }
                if (props.equip.Hp !== 0) {
                    gradeTemp[j + 3] = gradeTemp[j + 3] + oneValuePercent * 0.5 * grade[j]
                    gradeTemp[j + 4] = gradeTemp[j + 4] + oneValuePercent * 0.5 * grade[j]
                }
                if (props.equip.HpPercent !== 0) {
                    gradeTemp[j + 4] = gradeTemp[j + 4] + oneValuePercent * 0.2 * grade[j]
                    gradeTemp[j + 5] = gradeTemp[j + 5] + oneValuePercent * 0.2 * grade[j]
                    gradeTemp[j + 6] = gradeTemp[j + 6] + oneValuePercent * 0.2 * grade[j]
                    gradeTemp[j + 7] = gradeTemp[j + 7] + oneValuePercent * 0.2 * grade[j]
                    gradeTemp[j + 8] = gradeTemp[j + 8] + oneValuePercent * 0.2 * grade[j]
                }
                if (props.equip.Speed !== 0) {
                    gradeTemp[j + 4] = gradeTemp[j + 4] + oneValuePercent * 0.33 * grade[j]
                    gradeTemp[j + 6] = gradeTemp[j + 6] + oneValuePercent * 0.33 * grade[j]
                    gradeTemp[j + 8] = gradeTemp[j + 8] + oneValuePercent * 0.33 * grade[j]
                }
                if (props.equip.Hr !== 0) {
                    gradeTemp[j + 4] = gradeTemp[j + 4] + oneValuePercent * 0.2 * grade[j]
                    gradeTemp[j + 5] = gradeTemp[j + 5] + oneValuePercent * 0.2 * grade[j]
                    gradeTemp[j + 6] = gradeTemp[j + 6] + oneValuePercent * 0.2 * grade[j]
                    gradeTemp[j + 7] = gradeTemp[j + 7] + oneValuePercent * 0.2 * grade[j]
                    gradeTemp[j + 8] = gradeTemp[j + 8] + oneValuePercent * 0.2 * grade[j]
                }
                if (props.equip.RR !== 0) {
                    gradeTemp[j + 4] = gradeTemp[j + 4] + oneValuePercent * 0.2 * grade[j]
                    gradeTemp[j + 5] = gradeTemp[j + 5] + oneValuePercent * 0.2 * grade[j]
                    gradeTemp[j + 6] = gradeTemp[j + 6] + oneValuePercent * 0.2 * grade[j]
                    gradeTemp[j + 7] = gradeTemp[j + 7] + oneValuePercent * 0.2 * grade[j]
                    gradeTemp[j + 8] = gradeTemp[j + 8] + oneValuePercent * 0.2 * grade[j]
                }
                if (props.equip.CC !== 0) {
                    gradeTemp[j + 5] = gradeTemp[j + 5] + oneValuePercent * 0.33 * grade[j] // 4.5分
                    gradeTemp[j + 6] = gradeTemp[j + 6] + oneValuePercent * 0.33 * grade[j] // 6分
                    gradeTemp[j + 7] = gradeTemp[j + 7] + oneValuePercent * 0.33 * grade[j] // 7.5分
                }
                if (props.equip.CD !== 0) {
                    gradeTemp[j + 4] = gradeTemp[j + 4] + oneValuePercent * 0.25 * grade[j] // 4.4
                    gradeTemp[j + 5] = gradeTemp[j + 5] + oneValuePercent * 0.25 * grade[j] // 5.5
                    gradeTemp[j + 7] = gradeTemp[j + 7] + oneValuePercent * 0.25 * grade[j] // 6.6
                    gradeTemp[j + 8] = gradeTemp[j + 8] + oneValuePercent * 0.25 * grade[j] // 7.7
                }
            }
            for (let j = 0; j < 100; j++) {
                grade[j] = gradeTemp[j]
                gradeTemp[j] = 0
            }
        }
    } else {    
        // (Atk / 9)
        // (Defend / 6)
        // (Hp / 50)
        for (let i = 0; i < upgradeTime; i++) {
            for (let j = 0; j < 100; j++) {
                if (props.equip.Atk !== 0) {
                    // 范围在38-53之间，基本上就是5分
                    gradeTemp[j + 5] = gradeTemp[j + 5] + oneValuePercent * 1 * grade[j]
                }
                if (props.equip.AtkPercent !== 0) {
                    gradeTemp[j + 5] = gradeTemp[j + 5] + oneValuePercent * 0.2 * grade[j]
                    gradeTemp[j + 6] = gradeTemp[j + 6] + oneValuePercent * 0.2 * grade[j]
                    gradeTemp[j + 7] = gradeTemp[j + 7] + oneValuePercent * 0.2 * grade[j]
                    gradeTemp[j + 8] = gradeTemp[j + 8] + oneValuePercent * 0.2 * grade[j]
                    gradeTemp[j + 9] = gradeTemp[j + 9] + oneValuePercent * 0.2 * grade[j]
                }
                if (props.equip.Defend !== 0) {
                    // 范围在32到39之间，基本上就是6分
                    gradeTemp[j + 6] = gradeTemp[j + 6] + oneValuePercent * 1 * grade[j]
                }
                if (props.equip.DefendPercent !== 0) {
                    gradeTemp[j + 5] = gradeTemp[j + 5] + oneValuePercent * 0.2 * grade[j]
                    gradeTemp[j + 6] = gradeTemp[j + 6] + oneValuePercent * 0.2 * grade[j]
                    gradeTemp[j + 7] = gradeTemp[j + 7] + oneValuePercent * 0.2 * grade[j]
                    gradeTemp[j + 8] = gradeTemp[j + 8] + oneValuePercent * 0.2 * grade[j]
                    gradeTemp[j + 9] = gradeTemp[j + 9] + oneValuePercent * 0.2 * grade[j]
                }
                if (props.equip.Hp !== 0) {
                    // 范围在179-229之间，基本上就是4分
                    gradeTemp[j + 4] = gradeTemp[j + 4] + oneValuePercent * 1 * grade[j]
                }
                if (props.equip.HpPercent !== 0) {
                    gradeTemp[j + 5] = gradeTemp[j + 5] + oneValuePercent * 0.2 * grade[j]
                    gradeTemp[j + 6] = gradeTemp[j + 6] + oneValuePercent * 0.2 * grade[j]
                    gradeTemp[j + 7] = gradeTemp[j + 7] + oneValuePercent * 0.2 * grade[j]
                    gradeTemp[j + 8] = gradeTemp[j + 8] + oneValuePercent * 0.2 * grade[j]
                    gradeTemp[j + 9] = gradeTemp[j + 9] + oneValuePercent * 0.2 * grade[j]
                }
                if (props.equip.Speed !== 0) {
                    gradeTemp[j + 6] = gradeTemp[j + 6] + oneValuePercent * 0.5 * grade[j]
                    gradeTemp[j + 8] = gradeTemp[j + 8] + oneValuePercent * 0.5 * grade[j]
                }
                if (props.equip.Hr !== 0) {
                    gradeTemp[j + 5] = gradeTemp[j + 5] + oneValuePercent * 0.2 * grade[j]
                    gradeTemp[j + 6] = gradeTemp[j + 6] + oneValuePercent * 0.2 * grade[j]
                    gradeTemp[j + 7] = gradeTemp[j + 7] + oneValuePercent * 0.2 * grade[j]
                    gradeTemp[j + 8] = gradeTemp[j + 8] + oneValuePercent * 0.2 * grade[j]
                    gradeTemp[j + 9] = gradeTemp[j + 9] + oneValuePercent * 0.2 * grade[j]
                }
                if (props.equip.RR !== 0) {
                    gradeTemp[j + 5] = gradeTemp[j + 5] + oneValuePercent * 0.2 * grade[j]
                    gradeTemp[j + 6] = gradeTemp[j + 6] + oneValuePercent * 0.2 * grade[j]
                    gradeTemp[j + 7] = gradeTemp[j + 7] + oneValuePercent * 0.2 * grade[j]
                    gradeTemp[j + 8] = gradeTemp[j + 8] + oneValuePercent * 0.2 * grade[j]
                    gradeTemp[j + 9] = gradeTemp[j + 9] + oneValuePercent * 0.2 * grade[j]
                }

                if (props.equip.CC !== 0) {
                    gradeTemp[j + 5] = gradeTemp[j + 5] + oneValuePercent * 0.25 * grade[j] // 4.5分
                    gradeTemp[j + 6] = gradeTemp[j + 6] + oneValuePercent * 0.25 * grade[j] // 6分
                    gradeTemp[j + 7] = gradeTemp[j + 7] + oneValuePercent * 0.25 * grade[j] // 7.5分
                    gradeTemp[j + 9] = gradeTemp[j + 9] + oneValuePercent * 0.25 * grade[j] // 9分
                }
                if (props.equip.CD !== 0) {
                    gradeTemp[j + 4] = gradeTemp[j + 4] + oneValuePercent * 0.2 * grade[j] // 4.4
                    gradeTemp[j + 5] = gradeTemp[j + 5] + oneValuePercent * 0.2 * grade[j] // 5.5 
                    gradeTemp[j + 7] = gradeTemp[j + 7] + oneValuePercent * 0.2 * grade[j] // 6.6
                    gradeTemp[j + 8] = gradeTemp[j + 8] + oneValuePercent * 0.2 * grade[j] // 7.7
                    gradeTemp[j + 9] = gradeTemp[j + 9] + oneValuePercent * 0.2 * grade[j] // 8.8
                }
            }
            for (let j = 0; j < 100; j++) {
                grade[j] = gradeTemp[j]
                gradeTemp[j] = 0
            }
        }
    }
    
    let gradeLevel = []

    if (props.equip.Level === 85) {
        gradeLevel = levelGrade85
    } else {
        gradeLevel = levelGrade90
    }

    let result = [0, 0, 0, 0, 0, 0, 0]

    for (let i = 0, j = 0; j < 100; j++) {
        if (j <= gradeLevel[i]) {
            result[i] += grade[j]
        } else {
            i++
            result[i] += grade[j]
        }
    }

    const data = {
        labels: [`废件: 0 - ` + gradeLevel[0],
            `过度: ` + (gradeLevel[0] + 1) +` - ` + gradeLevel[1],
            `能用: ` + (gradeLevel[1] + 1) +` - ` + gradeLevel[2],
            `主力: ` + (gradeLevel[2] + 1) +` - ` + gradeLevel[3],
            `优秀: ` + (gradeLevel[3] + 1) +` - ` + gradeLevel[4],
            `传家宝: ` + (gradeLevel[4] + 1) + ` - ` + gradeLevel[5],
            `神器: ` + (gradeLevel[5] + 1) + "以上",],
        datasets: [{
            data: [Number((result[0]).toFixed(2)),
                Number((result[1]).toFixed(2)),
                Number((result[2]).toFixed(2)),
                Number((result[3]).toFixed(2)),
                Number((result[4]).toFixed(2)),
                Number((result[5]).toFixed(2)),
                Number((result[6]).toFixed(2)),],
            backgroundColor: ['#CCCCCC', '#99FF99', '#99CCFF', '#9966CC', '#FFCC66', '#FF6633', '#CC0000']
        }]
    };
    // 配置选项
    const options = {
        responsive: true,
        maintainAspectRatio: false
    };

    if (props.mode === "pie") { 
        return (
            <div style={{ height: 350 }}>
                <Pie style={{ height: 350 }} data={data} options={options} />
            </div>
        );
    }
    
    return <div>
        <p style={{ fontSize: 10 }}>{`废件:0-` + gradeLevel[0]+":"}<span style={{ color: "gray" }}>{`\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0`}{(result[0]).toFixed(2)}%</span></p>
        <p style={{ fontSize: 10 }}>过度:{gradeLevel[0] + 1}-{gradeLevel[1]}:<span style={{ color: "green" }}>{`\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0`}{(result[1]).toFixed(2)}%</span></p>
        <p style={{ fontSize: 10 }}>能用:{gradeLevel[1] + 1}-{gradeLevel[2]}:<span style={{ color: "blue" }}>{`\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0`}{(result[2]).toFixed(2)}%</span></p>
        <p style={{ fontSize: 10 }}>主力:{gradeLevel[2] + 1}-{gradeLevel[3]}:<span style={{ color: "purple" }}>{`\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0`}{(result[3]).toFixed(2)}%</span></p>
        <p style={{ fontSize: 10 }}>优秀:{gradeLevel[3] + 1}-{gradeLevel[4]}:<span style={{ color: "orange" }}>{`\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0`}{(result[4]).toFixed(2)}%</span></p>
        <p style={{ fontSize: 10 }}>传家宝:{gradeLevel[4] + 1}-{gradeLevel[5]}:<span style={{ color: "red" }}>{`\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0`}{(result[5]).toFixed(2)}%</span></p>
        <p style={{ fontSize: 10 }}>神器:{gradeLevel[5] + 1}-{"以上"}:<span style={{ color: "red", fontWeight: "bold" }}>{`\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0`}{(result[6]).toFixed(2)}%</span></p>
    </div>
};
