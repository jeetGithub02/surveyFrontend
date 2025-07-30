import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';

export const AgeLawDetails = ({ name, date }) => {

    const[agePercent, setAgePercent]= useState(0);
    const[age, setAge]= useState(0);
    const[consentPer, setConsentPer]= useState(0)

    const[participators, setParticipators]= useState([{"Date":""}]);


    useEffect(()=>{
        axios.get(`http://192.168.116.124:4080/get-participators`).then(response=>
        {
          setParticipators(response.data)
          setAgePercent(
            response.data.filter(party=>party.FirstAge < 18 ).length*100/response.data.filter(par=> par.Gender == "female").length 
          )
          setConsentPer(
            response.data.filter(party=>party.IsConsent).length*100/ response.data.filter(party=> party.Gender =="female").length
          )
        }
        )
    },[]);

    const formik = useFormik({
        initialValues: {
            Name: "",
            FirstAge: "",
            Gender: "",
            IsMarried: "false",
            IsSexed: "true",
            IsConsent: "true",
            ConsentOpinion: "No",
            Agree: false  // ✅ added
        },
        onSubmit: (data, { resetForm }) => {
            if (!data.Agree) {
                alert("Please agree to the terms before submitting.");
                return;
            }
             // ✅ Automatically assign unique name if left blank
            const nameToUse = data.Name.trim() === "" 
                ? `anonymous_${Date.now()}_${Math.floor(Math.random() * 1000)}`
                : data.Name;

            const formattedData = {
                ...data,
                Name: nameToUse,
                IsMarried: data.IsMarried === "true",
                IsSexed: data.IsSexed === "true",
                IsConsent: data.IsConsent === "true"
            };

            axios.post(`http://192.168.116.124:4080/add-participator`, formattedData)
                .then(() => {
                    alert("Thank you for the Participation");
                    resetForm();
                })
                .catch(err => {
                    console.error("Error submitting data:", err);
                    alert("Error saving your data.");
                });
        }
    });

    return (
        <div className="mt-2 container">
            <form onSubmit={formik.handleSubmit}>
                {/* HEADER */}
                <div className="grid grid-cols-1 gap-1 md:grid-cols-12 border-2 rounded-md p-2 my-2">
                    <h1 className='text-2xl col-span-7 font-medium'>Survey : {name}</h1>
                    <div className="col-span-3 text-lg font-medium text-[green]">Date : {date}</div>
                    <div className="col-span-2">
                        <button type="button" className="rounded-md bg-sky-500 px-2 py-1 text-lg text-white">PARTICIPATE</button>
                    </div>
                </div>

                {/* FORM FIELDS */}
                <div className="border-2 p-2 rounded-md">
                    <div className="grid grid-cols-2 gap-1">
                        {/* Name & Gender */}
                        <div className="col-span-2">
                            <div className="grid md:grid-cols-4 grid-cols-2 gap-1">
                                <div className="font-medium">Name (optional) :</div>
                                <div>
                                    <input
                                        type="text"
                                        name="Name"
                                        value={formik.values.Name}
                                        onChange={formik.handleChange}
                                        placeholder="Your Name"
                                        className="border py-1 px-2 rounded"
                                    />
                                </div>
                                <div className="font-medium">Gender :</div>
                                <div>
                                    <select
                                        name="Gender"
                                        value={formik.values.Gender}
                                        onChange={formik.handleChange}
                                        className="border py-1 px-2 rounded"
                                    >
                                        <option value="">Select gender</option>
                                        <option value="female">Female</option>
                                        <option value="male">Male</option>
                                        <option value="others">Others</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <hr className="col-span-2 my-3 border" />

                        {/* Questions */}
                        <div className="font-medium">Que 1 : Are you married?</div>
                        <div>
                            <select
                                name="IsMarried"
                                value={formik.values.IsMarried}
                                onChange={formik.handleChange}
                                className="border py-1 px-2 rounded"
                            >
                                <option value="false">No</option>
                                <option value="true">Yes</option>
                            </select>
                        </div>

                        <div className="font-medium">Que 2 : Have you done se*?</div>
                        <div>
                            <select
                                name="IsSexed"
                                value={formik.values.IsSexed}
                                onChange={formik.handleChange}
                                className="border py-1 px-2 rounded"
                            >
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </select>
                        </div>

                        <div className="font-medium">Que 3 : First age of se*</div>
                        <div>
                            <select
                                name="FirstAge"
                                value={formik.values.FirstAge}
                                onChange={formik.handleChange}
                                className="border rounded py-1 px-2"
                            >
                                <option value="">Select your age</option>
                                <option value="12">{"<= 12 years"}</option>
                                <option value="13">13 years</option>
                                <option value="14">14 years</option>
                                <option value="15">15 years</option>
                                <option value="16">16 years</option>
                                <option value="17">17 years</option>
                                <option value="18">18 years</option>
                                <option value="19">19 years</option>
                                <option value="20">{">= 20 years"}</option>
                            </select>
                        </div>

                        <div className="font-medium">Que 4 : Had everything done with your consent?</div>
                        <div>
                            <select
                                name="IsConsent"
                                value={formik.values.IsConsent}
                                onChange={formik.handleChange}
                                className="border py-1 px-2 rounded"
                            >
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </select>
                        </div>

                        <div className="font-medium">Que 5 : Can male friend do se* without consent?</div>
                        <div>
                            <select
                                name="ConsentOpinion"
                                value={formik.values.ConsentOpinion}
                                onChange={formik.handleChange}
                                className="border rounded px-2 py-1"
                            >
                                <option value="No">No</option>
                                <option value="Yes">Yes</option>
                                <option value="DKnow">Don't know</option>
                            </select>
                        </div>

                        {/* I Agree */}
                        <div className="col-span-2 my-2 text-center">
                            <input
                                type="checkbox"
                                name="Agree"
                                id="agree"
                                checked={formik.values.Agree}
                                onChange={formik.handleChange}
                            />
                            <label htmlFor="agree" className="text-green-900 ml-2">
                                I agree to share my written information with this survey.
                            </label>
                        </div>

                        <div className="text-center col-span-2 mt-3">
                            <button type="submit" className="px-2 py-1 border rounded text-white bg-sky-600">
                                SUBMIT
                            </button>
                        </div>
                    </div>
                </div>
            </form>
            <div className="my-2 border-2 p-2 rounded-md">
            <h2 className="text-2xl font-medium text-center mb-2">Survey Report</h2>
            <div className="grid grid-cols-2 gap-1">
               <h2 className="font-medium">Select gender</h2>
               <select className="border px-2 py-1 rounded">
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                </select>
                <h2 className="font-medium">Select question</h2>
                <select className="border px-2 py-1 rounded">
                    <option value="Q1">Have done se*.</option>
                    <option value="Q2">Was the consent.</option>
                    <option value="consentOpinion">Can be done without consent</option>
                </select>
                <hr  className="col-span-2 my-2 mt-3 border"/>
                   <h2 className="font-medium"> Have done first se* at age of </h2>
                    <select name="firstAge" className="border rounded py-1 px-2">
                            <option value="*">Select age</option>
                            <option value=">12">{"<= 12 years"}</option>
                            <option value="13">13 years</option>
                            <option value="14">14 years</option>
                            <option value="15">15 years</option>
                            <option value="16">16 years</option>
                            <option value="17">17 years</option>
                            <option value="18">18 years</option>
                            <option value="19">19 years</option>
                            <option value="20">{">= 20 years"}</option>
                            
                        </select>
               
                <div className="col-span-2 text-center mt-2">
                    <button className='border rounded-md py-1 px-2'>Show</button>
                </div>
            </div>
            <hr  className="col-span-2 my-2 mt-3 border"/>
            <div className="text-lg font-medium text-center">
                <span className="text-2xl text-green-900 font-bold">{Math.round(agePercent)}%</span> of <span className="text-2xl text-green-900 font-bold">Females</span> have done their first se* before the age of <span className="text-2xl text-green-900 font-bold">18 years</span> with their consent. <br />
                <span className="text-2xl text-green-900 font-bold">{Math.round(consentPer)}%</span> of <span className="text-2xl text-green-900 font-bold">Females{}</span> believe that boyfriends can't do se* without the consent of them.
            </div>
       </div>
        </div>
    );
};
