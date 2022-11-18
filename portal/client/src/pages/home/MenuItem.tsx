import React from "react";
import { FC } from "react";
import { IMenuCard } from "../../interfaces/IMenuCard";
import classes from "./MenuItem.module.scss"

export const MenuItem: FC<{card: IMenuCard}> = ({card}) => {
  return (
    <div className="card h-100 shadow-sm">
      {/* if specific media size, button should adjust */}
      <div className={classes.image+" "+" position-relative"} style={{ cursor: "pointer" }}>
        <img className="img-fluid bg-info" src={card.imageUrl} />
        <div className={classes.overlay+" "+"d-flex align-items-center justify-content-center hover-overlay"}>
          <button type="button" className="btn btn-primary">{card.itemName}</button>
        </div>
      </div>

      <div className="card-body d-flex flex-column">
        {/* add router here */}
        <a>
          <h6 className="text-uppercase">{card.description}</h6>
        </a>
      </div>
    </div>
  );
};
