import React from 'react';
import { Button, Label, Modal, TextInput } from 'flowbite-react';
function EditUserModal(props) {
    const [visible, setVisible] = React.useState(false);
    return (
        <React.Fragment>
            <Button onClick={() => setVisible(true)} color="transparent">
                Edit
            </Button>
            <Modal
                show={visible}
                onClose={() => setVisible(false)}
            >

                <Modal.Header>
                    Edit user
                </Modal.Header>
                <Modal.Body>
                    <div className="p-6 space-y-6">
                        <div className="grid grid-cols-6 gap-6">
                            <div className="col-span-6 sm:col-span-3">
                                <label
                                    htmlFor="first-name"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    name="first-name"
                                    id="first-name"
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Bonnie"
                                    required="" />
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                                <label
                                    htmlFor="last-name"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    name="last-name"
                                    id="last-name"
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Green"
                                    required="" />
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                                <label
                                    htmlFor="email"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="example@company.com"
                                    required="" />
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                                <label
                                    htmlFor="phone-number"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Phone Number
                                </label>
                                <input
                                    type="number"
                                    name="phone-number"
                                    id="phone-number"
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="e.g. +(12)3456 789"
                                    required="" />
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                                <label
                                    htmlFor="department"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Department
                                </label>
                                <input
                                    type="text"
                                    name="department"
                                    id="department"
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Development"
                                    required="" />
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                                <label
                                    htmlFor="company"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Company
                                </label>
                                <input
                                    type="number"
                                    name="company"
                                    id="company"
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder={123456}
                                    required="" />
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                                <label
                                    htmlFor="current-password"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Current Password
                                </label>
                                <input
                                    type="password"
                                    name="current-password"
                                    id="current-password"
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="••••••••"
                                    required="" />
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                                <label
                                    htmlFor="new-password"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    name="new-password"
                                    id="new-password"
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="••••••••"
                                    required="" />
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setVisible(false)}>
                        Save all
                    </Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    );
}

export default EditUserModal;