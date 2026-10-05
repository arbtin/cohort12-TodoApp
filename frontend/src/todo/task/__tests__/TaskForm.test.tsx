import {render, screen} from "@testing-library/react";
import {TaskForm} from "../TaskForm.tsx";

vi.mock("../TaskApi");

describe('TaskForm', () => {
    it('renders correctly', () => {
        render(<TaskForm isOpen={false} onClose={function(): void {
            throw new Error("Function not implemented.");
        } }/>);


    })
})
