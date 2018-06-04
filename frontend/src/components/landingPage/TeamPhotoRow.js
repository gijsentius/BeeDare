import React from "react";
import EmployeeGijs from "../../images/EmployeeGijs.JPG";
import EmployeeStephan from "../../images/EmployeeStephan.png";
import EmployeeJelmer from "../../images/EmployeeJelmer.JPG";
import EmployeeDagmar from "../../images/EmployeeDagmar.jpg";
import EmployeeRoy from "../../images/EmployeeRoy.jpg";


class TeamPhotoRow extends React.Component{
    render(){
        return(
            <div className="employee-row">
                <img src={EmployeeStephan} alt="" className="circle responsive-img"
                     />
                <img src={EmployeeJelmer} alt="" className="circle responsive-img"
                     />
                <img src={EmployeeGijs} alt="" className="circle responsive-img"
                     />
                <img src={EmployeeDagmar} alt="" className="circle responsive-img"
                     />
                <img src={EmployeeRoy} alt="" className="circle responsive-img"
                />
            </div>


        );
    }
}

export default TeamPhotoRow