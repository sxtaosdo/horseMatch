/**
 *
 * @author 
 *
 */
class StateMachine {
    private m_pOwner: IBaseGameEntity;
    private m_pCurrentState: IState;
    private m_pPreviousState: IState;
    private m_pGlobalState: IState;

    public constructor(owner: IBaseGameEntity) {
        this.m_pOwner = owner;
        this.m_pCurrentState = null;
        this.m_pPreviousState = null;
        this.m_pGlobalState = null;
    }

    public SetCurrentState(state: IState): void {
        this.m_pCurrentState = state;
    }

    public SetPreviousState(state: IState): void {
        this.m_pPreviousState = state;
    }

    public SetGlobalState(state: IState): void {
        this.m_pGlobalState = state;
    }

    public Update(): void {
        if (this.m_pGlobalState != null) {
            this.m_pGlobalState.execute(this.m_pOwner);
        }
        if (this.m_pCurrentState != null) {
            this.m_pCurrentState.execute(this.m_pOwner);
        }
    }

    public ChangeState(pNewState: IState): void {
        if (this.m_pCurrentState == null) {
            this.m_pCurrentState = pNewState;
            this.m_pCurrentState.enter(this.m_pOwner);
        } else {

            if (pNewState != null) {
                this.m_pPreviousState = this.m_pCurrentState;
                this.m_pCurrentState.exit(this.m_pOwner);
                this.m_pCurrentState = pNewState;
                this.m_pCurrentState.enter(this.m_pOwner);
            } else {
                console.error("pNewState:" + pNewState);
            }
        }
    }

    public HandleMessage(msg: Telegram): boolean {
        if (this.m_pCurrentState && this.m_pCurrentState.onMessage(this.m_pOwner, msg)) {
            return true;
        }
        if (this.m_pGlobalState && this.m_pGlobalState.onMessage(this.m_pOwner, msg)) {
            return true;
        }
        return false;
    }

    public RevertToPreviousState(): void {
        this.ChangeState(this.m_pPreviousState);
    }

    public isInState(state: any | IState): boolean {
        if (this.m_pCurrentState instanceof state) {
            return true;
        }
        return false;
    }

    public get CurrentState(): IState {
        return this.m_pCurrentState;
    }

    public get GlobalState(): IState {
        return this.m_pGlobalState;
    }

    public get PreviousState(): IState {
        return this.m_pPreviousState;
    }

    //only ever used during debugging to grab the name of the current state
    public GetNameOfCurrentState(): string {
        return;
    }
}
