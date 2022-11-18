import React from "react";
import { IMenuCard } from "../../interfaces/IMenuCard";
import { MenuItem } from "./MenuItem";

export const MainMenuList = () => {
  const menuItem: IMenuCard[] = [
    { id: 1, itemName: "Check your schedule", imageUrl:"/assets/schedule.jpeg", description: "See what going on this semester"},
    {
      id: 2,
      itemName: "Check your current grade",
      imageUrl: "/assets/grade.jpg",
      description: "Your grades, you may want to monitor"
    },
    {
      id: 3,
      itemName: "Set a meeting",
      imageUrl: "/assets/meeting.jpg",
      description: "Your instructor you may want to talk to"
    },
    {
      id: 4,
      itemName: "Financial section",
      imageUrl: "/assets/meeting.jpg",
      description: "Your financial status you way check"
    },
  ];

  return (
    <>
    <div>
        {/* there will be an annoucement class to give on-time informations to students */}
        <div className="alert alert-warning" role="alert">
          <h4 className="alert-heading">You have an unpaid balance!</h4>
          <p>
            This is a message to tell you that you need to pay your remaining
            tuition as soon as possible
          </p>
          <hr />
          <p className="mb-0">
            Contact snow college financial department for more infos...
          </p>
        </div>
      </div>

      <div className="row">
        {/* for let dashboard of dashboards */}
          {menuItem.map((item) => (
            <div className="col-md-6 col-lg-3 col-xs-12 my-2" >
            <MenuItem  card={item} />
            </div>
          ))}
      </div>
    </>
  );
};
