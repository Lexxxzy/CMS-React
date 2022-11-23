import React, { useState } from "react";
import cn from "classnames";
import styles from "./Dropdown.module.sass";
import Icon from "../Icon";
import OutsideClickHandler from "react-outside-click-handler";

const Dropdown = ({ className, value, setValue, options, empty, isTask=false }) => {
  const [visible, setVisible] = useState(false);

  const handleClick = (value) => {
    setValue(value);
    setVisible(false);
  };

  return (
    <OutsideClickHandler onOutsideClick={() => setVisible(false)}>
      <div
        className={cn(styles.dropdown, { [styles.empty]: empty }, className, {
          [styles.active]: visible,
        })}
      >
        <div className={cn(styles.head, `${!isTask ? 'bg-slate-800/50' : 'bg-gray-600/30'}`)} onClick={() => setVisible(!visible)}>
          <div className={styles.selection}>{value==null ? 'None' : value}</div>
          <div className={styles.arrow}>
            <Icon name="arrow" size="10" />
          </div>
        </div>
        <div className={cn(styles.body, 'backdrop-blur-sm overflow-y-auto h-[8.5rem] min-h-fit',  `${!isTask ? 'bg-gray-900/90' : 'bg-gray-600/30'}`)}>
          {options.map((x, index) => (
            <div
              className={cn(styles.option, {
                [styles.selectioned]: x === value,
              })}
              onClick={() => handleClick(x, index)}
              key={index}
            >
              {x === null ? 'None' : x}
            </div>
          ))}
        </div>
      </div>
      </OutsideClickHandler>
  );
};

export default Dropdown;
