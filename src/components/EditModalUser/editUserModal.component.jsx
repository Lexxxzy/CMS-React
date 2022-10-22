import React, { useEffect} from 'react';
import { Button, Modal } from 'flowbite-react';
import OutsideClickHandler from "react-outside-click-handler";
    
function EditUserModal(props) {
    const [visible, setVisible] = React.useState(false);
    const { fields, data, title } = props

    useEffect(() => {
        const firstField = document.querySelector("input[name=field-0]")
        if (firstField != null) {
            firstField.focus()
        }
    }, [visible])


    const handleNext = (e) => {
        if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
            const { name } = e.target;
            const [_, fieldIndex] = name.split("-");
            let fieldIntIndex = parseInt(fieldIndex, 10);

            const nextfield = document.querySelector(
                e.key === "ArrowLeft" ? `input[name=field-${fieldIntIndex - 1}]`
                    : `input[name=field-${fieldIntIndex + 1}]`
            );

            if (nextfield !== null) {
                nextfield.focus();
            }
        }

    }
    return (
        
        <React.Fragment>
            <Button onClick={() => setVisible(true)} color="transparent">
                More Info
            </Button>
            <Modal
            
                show={visible}
                onClose={() => setVisible(false)}
            >
            <OutsideClickHandler onOutsideClick={() => setVisible(false)}>
                <div className="bg-slate-900/10">

                    <Modal.Header>
                        Edit {title.slice(0, title.length-1)}

                    </Modal.Header>
                    <Modal.Body>
                        <div className="p-6 space-y-6">
                            <div className="grid grid-cols-6 gap-6">
                                {
                                    fields.map((title, index) => (
                                        <div className="col-span-6 sm:col-span-3" key={index}>
                                            <label
                                                htmlFor={`field-${index}`}
                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                            >
                                                { title.charAt(0).toUpperCase() +  title.slice(1)}
                                            </label>
                                            <input

                                                type="text"
                                                name={`field-${index}`}
                                                id={`${title}`}
                                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600/30 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                placeholder={data[title]}
                                                onKeyDown={handleNext}
                                                required="" />
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </Modal.Body>
                    <div className='flex justify-center items-center '>
                        <Modal.Footer>
                            <Button onClick={() => setVisible(false)}>
                                <div >Save all</div>
                            </Button>

                        </Modal.Footer>
                    </div>
                </div>
                </OutsideClickHandler>
            </Modal>
            
        </React.Fragment>
        
    );
}

export default EditUserModal;