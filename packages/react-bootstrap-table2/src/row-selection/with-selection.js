import React from 'react';
import Const from '../const';
import SelectionContext from '../contexts/selection-context';

export default (Component, selectRow) => (props) => {
  const resolveProps = (selectionProps) => {
    const { allRowsSelected, allRowsNotSelected, ...rest } = selectionProps;


    if (selectRow.mode !== Const.ROW_SELECT_DISABLED) {
      let checkedStatus;

      // checkbox status depending on selected rows counts
      if (allRowsSelected) checkedStatus = Const.CHECKBOX_STATUS_CHECKED;
      else if (allRowsNotSelected) checkedStatus = Const.CHECKBOX_STATUS_UNCHECKED;
      else checkedStatus = Const.CHECKBOX_STATUS_INDETERMINATE;

      return {
        selected: [],
        ...selectRow,
        ...rest,
        checkedStatus
      };
    }

    return {
      mode: Const.ROW_SELECT_DISABLED,
      selected: []
    };
  };

  const childRenderer = (selectionProps) => {
    const headerCellSelectionInfo = resolveProps(selectionProps);
    return <Component { ...props } selectRow={ headerCellSelectionInfo } />;
  };

  return (
    <SelectionContext.Consumer>
      { childRenderer }
    </SelectionContext.Consumer>
  );
};
