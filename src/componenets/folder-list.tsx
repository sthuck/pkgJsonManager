import {actionCheckFolder, actionUncheckFolder} from '../store/allFolders';
import {IState} from '../store';
import {CheckboxList} from './checkbox-list';
import {connect} from 'react-redux';

const mapStateToProps = (state: IState) => ({
  items: state.allFolders.folders as Array<{id: string | number, name: string}>
});
export const FolderList: any =
  connect(mapStateToProps,
    {onCheck: actionCheckFolder, onUncheck: actionUncheckFolder})(CheckboxList);
