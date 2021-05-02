// @ts-ignore
import React, {useEffect, useState} from "react";

const BodyMassIndex = () => {
    useState()

    const [weight, setWeight] = useState(0)
    const [height, setHeight] = useState(0)
    const [bmi, setBmi] = useState(0)
    const [heightUnit, setHeightUnit] = useState("inches")
    const [massUnit, setMassUnit] = useState("lbs")

    useEffect(() => {
        updateBmi()
    })

    const roundNumber = (num: number, dec: number) => {
        return Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
    }

    const updateBmi = () => {
        let newWeight;
        if (massUnit === 'kg') {
            newWeight = weight
        } else {
            newWeight = convertPoundsToKilograms(weight)
        }
        let newHeight
        if (heightUnit === 'cm') {
            newHeight = height
        } else {
            newHeight = convertInchesToCentimeters(height)
        }

        setBmi(newWeight / Math.pow(newHeight / 100, 2))
    }

    const convertPoundsToKilograms = (valueInPounds: number) => {
        return 0.45359237 * valueInPounds;
    }

    const convertInchesToCentimeters = (valueInInches: number) => {
        return 2.54 * valueInInches;
    }

    return (
        <div>
            <h1>BMI Calculator</h1>
            <div className="input-group">
                <div className="input-group-prepend">
                    <span className="input-group-text">Weight</span>
                </div>
                <input className="form-control" type="number" min="0" value={weight} onChange={event => {
                           setWeight(+event.target.value)
                       }}/>
                <select className="custom-select col-2" value={massUnit}
                        onChange={event => {
                            setMassUnit(event.target.value)
                        }}>
                    <option defaultValue={"lbs"} value="lbs">lbs</option>
                    <option value="kg">kg</option>
                </select>
            </div>
            <div className="input-group">
                <div className="input-group-prepend">
                    <span className="input-group-text">Height</span>
                </div>
                <input className="form-control" type="number" min="0" value={height} onChange={event => {
                           setHeight(+event.target.value)
                       }}/>
                <select className="custom-select col-2" value={heightUnit} onChange={event => {
                    setHeightUnit(event.target.value)
                }}>
                    <option defaultValue={"inches"} value="inches">inches</option>
                    <option value="cm">cm</option>
                </select>
            </div>
            <h2>{roundNumber(bmi, 1)} <span className="small">kg / m^2</span></h2>

        </div>
    );
}


export default BodyMassIndex;
