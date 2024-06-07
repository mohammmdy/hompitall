import React from 'react'
import { useFormik } from 'formik';
import axios from 'axios';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import Alert from '@mui/material/Alert';
export default function UpdateResp() {
    
    let validationSchema = Yup.object({
        patientId:Yup.string().required("يرجي ادخال patient Id"),
        hospitalId:Yup.string().required("يرجي ادخال hospital Id"),
        exist:Yup.string().required("يرجي الادخال")
    })
    async function handelRespSubmit(values){
        try{
            const { data } = await axios.put(`http://localhost:9000/web/updateState`, values);
            console.log(data);
            if(data.data){
                toast.success('تم تعديل حاله')
            }
        }
        catch(error){
            console.log(error)
            toast.error('حدث خطا')
        }

    }
   const formik = useFormik({
    initialValues:{
        patientId:"",
        hospitalId:"",
        exist:""
    
    },validationSchema,onSubmit:handelRespSubmit

   })
  return (
    <div className='w-50 mx-auto py-4 container'>
        <h2 className='text-main text-center'>تعديل حاله </h2>
       <form className='row mx-auto' onSubmit={formik.handleSubmit}>
       <input type='number' id='patientId' name='patientId' className='my-3 input' placeholder='patient Id' onChange={formik.handleChange} onBlur={formik.handleBlur}  value={formik.values.patientId} />
       {formik.errors.patientId&&formik.touched.patientId?<Alert severity="error"> {formik.errors.patientId} </Alert>:''}
        <input type='text' id='hospitalId' name='hospitalId' className='my-3 input' placeholder='hospital Id' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.hospitalId} />
        {formik.errors.hospitalId&&formik.touched.hospitalId?<Alert severity="error"> {formik.errors.hospitalId} </Alert>:''}
        <select onChange={formik.handleChange} onBlur={formik.handleBlur} id='exist' name='exist' value={formik.values.exist} className='input h-25'>
           <option></option>
            <option value="no">no</option>
        </select>
        {formik.errors.exist&&formik.touched.exist?<Alert severity="error"> {formik.errors.exist} </Alert>:''}
        <div className='col-4 d-flex justify-content-center align-items-center'>
          <button className='btn botton my-2 text-light' type='submit'>تاكيد</button>
        </div>
       </form>

    </div>
  )
}
