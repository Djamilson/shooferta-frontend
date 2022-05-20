import IState from './state'
import IStateInfo from './stateInfo'

export default interface IListStates {
  data: {
    states?: IState[]
    stateInfo: IStateInfo
  }
}
