import React, { useEffect, useRef } from 'react'
import useCervicalCancer from '../../hooks/useCervicalCancer';
import CountingData from './CountingData';
import VisitGraph from './VisitGraph';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import CenterCount from './CenterCount';
import FileSaver from "file-saver";
import * as XLSX from 'xlsx';

const CervicalCancerPage = () => {
    const { fetchAllCervicalCancer, fetchFilterData, deletePatient, cervicalCancerData,
        cervicalCancerDetails, fetchCervicalCancerById
     } = useCervicalCancer();
    console.log(cervicalCancerData);
    const dialogRef = useRef(null);
    const navigate = useNavigate();
    const closeDialog = () => {
        dialogRef.current.close();
    };

    useEffect(() => {
        fetchAllCervicalCancer();
        if (cervicalCancerDetails) {
            fetchCervicalCancerById(cervicalCancerDetails?._id)
        }
    }, []);

    const formik = useFormik({
        initialValues: {
            personalName: '',
            resultStatus: '',
            fromDate: '',
            toDate: '',
            centerCode: '',
            bloodStatus: '',
            cardStatus: '',
        },
        validationSchema: Yup.object({
            personalName: Yup.string(),
            resultStatus: Yup.string(),
            fromDate: Yup.date(),
            toDate: Yup.date(),
            centerCode: Yup.string(),
            bloodStatus: Yup.string(),
            cardStatus: Yup.string(),
        }),
        onSubmit: (values) => {
            fetchFilterData(values); // Send form values to your API
            document.getElementById('filterdata').close(); // Close modal after submit
        },
    });

    const downloadcervicalCancerDetails = () => {
        if (cervicalCancerDetails) {
            const data = [
                {
                    "Personal Name": cervicalCancerDetails?.personalName,
                    "Age": cervicalCancerDetails?.age,
                    "Gender": cervicalCancerDetails?.gender,
                    "Address": `${cervicalCancerDetails?.address.house}, ${cervicalCancerDetails?.address.city}, ${cervicalCancerDetails?.address.district}, ${cervicalCancerDetails?.address.state}, ${cervicalCancerDetails?.address.pincode}`,
                    "Mobile Number": cervicalCancerDetails?.mobileNumber,
                    "Blood Status": cervicalCancerDetails?.bloodStatus,
                    "Card Status": cervicalCancerDetails?.cardStatus,
                    "Result Status": cervicalCancerDetails?.resultStatus,
                    "Center Code": cervicalCancerDetails?.centerCode,
                    "Center Name": cervicalCancerDetails?.centerName,
                    "Created At": new Date(cervicalCancerDetails?.createdAt).toLocaleString(),
                    "Is Under Blood Transfusion": cervicalCancerDetails?.isUnderBloodTransfusion ? 'Yes' : 'No',
                    "Is Under Medication": cervicalCancerDetails?.isUnderMedication ? 'Yes' : 'No',
                    "Marital Status": cervicalCancerDetails?.maritalStatus,
                    "Family History": cervicalCancerDetails?.familyHistory ? 'Yes' : 'No',
                    "Fathers Name": cervicalCancerDetails?.fathersName,
                    "ABHA Number": cervicalCancerDetails?.number,
                    "Aadhaar Number": cervicalCancerDetails?.aadhaarNumber,
                    "Mothers Name": cervicalCancerDetails?.motherName,
                    "Cast": cervicalCancerDetails?.caste,
                    "Category": cervicalCancerDetails?.category,
                    "Sub Caste": cervicalCancerDetails?.subCaste,
                }
            ];
            const worksheet = XLSX.utils.json_to_sheet(data);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Candidate Details");

            const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
            const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
            FileSaver.saveAs(blob, `candidate_${cervicalCancerDetails?._id}_details.xlsx`);
        } else {
            console.error("Candidate details not available.");
        }
    };

    const onEdit = (item) => {
        console.log('item', item)
        navigate(`/edit-cervical-cancer/${item._id}`);
    }
    const onDelete = (item) => deletePatient(item?._id);
    return (
        <>
            <CountingData />
            <VisitGraph />
            <CenterCount />
            <div className="container mx-auto p-4">
                <div className="flex gap-4 mb-4">
                    <h1 className="text-2xl font-bold">Screening Data</h1>
                    <div className="flex gap-4 items-center">
                        <div
                            onClick={() => document.getElementById('filterdata').showModal()}
                            className="text-blue-500 bg-blue-100 flex items-center px-2 h-5 border-2 border-blue-300 py-2 rounded cursor-pointer">Filter Data
                            <svg className="ml-2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-funnel" viewBox="0 0 16 16">
                                <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2z" />
                            </svg>
                        </div>
                        <div className="text-blue-500 bg-blue-100 flex items-center px-2 h-5 border-2 border-blue-300 py-2 rounded ">Edit Result</div>
                    </div>
                </div>
                <table className="table w-full ">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">Select</th>
                            <th className="border px-4 py-2">Name</th>
                            <th className="border px-4 py-2">Date</th>
                            <th className="border px-4 py-2">Center Code</th>
                            <th className="border px-4 py-2">Blood Group</th>
                            <th className="border px-4 py-2">Result Status</th>
                            <th className="border px-4 py-2">Card Status</th>
                            <th className="border px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cervicalCancerData?.map((item, index) => (
                            <tr key={index}>
                                <td className="border px-4 py-2 text-center">
                                    <input type="checkbox" />
                                </td>
                                <td className="border px-4 py-2">{item.personalName}</td>
                                <td className="border px-4 py-2"> {new Date(item.createdAt).toLocaleDateString('en-GB')}</td>
                                <td className="border px-4 py-2">{item.centerCode}</td>
                                <td className={`border px-4 py-2 ${item.bloodStatus === 'Pending' ? 'text-red-500' : 'text-blue-500'}`}>
                                    {item.bloodStatus}
                                </td>
                                <td className={`border px-4 py-2 ${item.resultStatus === 'Pending' ? 'text-red-500' : 'text-blue-500'}`}>
                                    {item.resultStatus}
                                </td>
                                <td className={`border px-4 py-2 ${item.cardStatus === 'Pending' ? 'text-red-500' : 'text-blue-500'}`}>{item.cardStatus}</td>
                                <td className="border px-4 py-2 flex justify-around gap-4">
                                    <button className="text-black hover:text-gray-600" onClick={downloadcervicalCancerDetails}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-download" viewBox="0 0 16 16">
                                            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                                            <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
                                        </svg>
                                    </button>
                                    <button className="text-black hover:text-gray-600" onClick={() => onEdit(item)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16" >
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                        </svg>
                                    </button>
                                    <button className="text-orange-500 hover:text-red-600" onClick={() => onDelete(item)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Filter Modal Start */}

            <dialog ref={dialogRef} id="filterdata" className="modal">
                <div className="modal-box" style={{ width: '900px', height: '400px' }}>
                    <div className="flex justify-between">
                        <h1 className="font-bold">Filters</h1>
                        <div className="flex gap-2 text-sm font-bold">
                            <span onClick={closeDialog}
                                className="cursor-pointer">Cancel</span>
                            <span className="text-blue-500 cursor-pointer"
                                onClick={formik.handleSubmit}
                            >Save View</span>
                        </div>
                    </div>

                    <div>
                        <div className="flex gap-6 items-center">
                            <div className="collapse collapse-arrow ">
                                <input type="checkbox" />
                                <div className="collapse-title text-sm  font-medium">Enter Employee Name</div>
                                <div className="collapse-content">
                                    <label
                                        className="input input-sm w-40 input-bordered flex items-center gap-2">
                                        <input
                                            type="text"
                                            name="personalName"
                                            value={formik.values.personalName}
                                            onChange={formik.handleChange}
                                            className="input input-bordered w-full"
                                        />
                                    </label>
                                </div>
                            </div>
                            <div className="collapse collapse-arrow ">
                                <input type="checkbox" />
                                <div className="collapse-title text-sm font-medium">Result Status</div>
                                <div className="collapse-content">
                                    <select
                                        name="resultStatus"
                                        value={formik.values.resultStatus}
                                        onChange={formik.handleChange}
                                        className="select select-bordered w-full"
                                    >
                                        <option value="Negative">Negative</option>
                                        <option value="Positive">Positive</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-6 items-center">
                            <div className="collapse collapse-arrow ">
                                <input type="checkbox" />
                                <div className="collapse-title text-sm  font-medium">Select Date</div>
                                <div className="collapse-content">
                                    <div>
                                        <label>
                                            Start Date
                                            <input
                                                type="date"
                                                name="fromDate"
                                                value={formik.values.fromDate}
                                                onChange={formik.handleChange}
                                                className="input input-bordered w-full"
                                            />
                                        </label>
                                        <label>
                                            End Date
                                            <input
                                                type="date"
                                                name="toDate"
                                                value={formik.values.toDate}
                                                onChange={formik.handleChange}
                                                className="input input-bordered w-full"
                                            />
                                        </label>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="flex gap-6 items-center">
                            <div className="collapse collapse-arrow ">
                                <input type="checkbox" />
                                <div className="collapse-title text-sm  font-medium">Enter Center Code</div>
                                <div className="collapse-content">
                                    <label
                                        className="input input-sm w-40 input-bordered flex items-center gap-2">
                                        <input
                                            type="text"
                                            name="centerCode"
                                            value={formik.values.centerCode}
                                            onChange={formik.handleChange}
                                            className="input input-bordered w-full"
                                        />
                                    </label>
                                </div>
                            </div>
                            <div className="collapse collapse-arrow ">
                                <input type="checkbox" />
                                <div className="collapse-title text-sm font-medium">Card Status</div>
                                <div className="collapse-content">
                                    <select
                                        name="cardStatus"
                                        value={formik.values.cardStatus}
                                        onChange={formik.handleChange}
                                        className="select select-bordered w-full"
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="HangOut">HangOut</option>
                                        <option value="Submitted">Submitted</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="  items-center">
                            <div className="collapse collapse-arrow w-56">
                                <input type="checkbox" />
                                <div className="collapse-title text-sm  font-medium">Blood Group</div>
                                <div className="collapse-content">
                                    <label
                                        className="input input-sm w-40 input-bordered flex items-center gap-2">
                                        <select
                                            name="bloodStatus"
                                            value={formik.values.bloodStatus}
                                            onChange={formik.handleChange}
                                            className="select select-bordered w-full"
                                        >
                                            <option value="A+ve">A+ve</option>
                                            <option value="A-ve">A-ve</option>
                                            <option value="B+ve">B+ve</option>
                                            <option value="B-ve">B-ve</option>
                                            <option value="O+ve">O+ve</option>
                                            <option value="O-ve">O-ve</option>
                                            <option value="AB+ve">AB+ve</option>
                                            <option value="AB-ve">AB-ve</option>
                                            <option value="Pending">Pending</option>
                                        </select>
                                    </label>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </>
    );
}

export default CervicalCancerPage