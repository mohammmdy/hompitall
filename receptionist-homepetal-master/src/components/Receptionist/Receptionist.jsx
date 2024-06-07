import React from 'react'
import { useFormik } from 'formik';
import axios from 'axios';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import Alert from '@mui/material/Alert';
export default function Receptionist() {
    let validationSchema = Yup.object({
        patientId:Yup.string().required("يرجي ادخال patient Id"),
        hospitalId:Yup.string().required("يرجي ادخال hospital Id"),
        case:Yup.string().required("يرجي ادخال التشخيص"),
        state:Yup.string().required("يرجي ادخال الحاله")
    
    })
    async function handelRespSubmit(values){
        try{
            const { data } = await axios.post(`http://localhost:9000/web/createState`, values);
            console.log(data);
            if(data.data){
                toast.success('تم اضافه حاله')
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
        case:"",
        state:""
    },validationSchema,onSubmit:handelRespSubmit

   })
  return (
    <div className='w-50 mx-auto py-4 container'>
        <h2 className='text-main text-center'>اضافه حاله </h2>
       <form className='row mx-auto' onSubmit={formik.handleSubmit}>
       <input type='number' id='patientId' name='patientId' className='my-3 input' placeholder='patient Id' onChange={formik.handleChange} onBlur={formik.handleBlur}  value={formik.values.patientId} />
       {formik.errors.patientId&&formik.touched.patientId?<Alert severity="error"> {formik.errors.patientId} </Alert>:''}
        <input type='text' id='hospitalId' name='hospitalId' className='my-3 input' placeholder='hospital Id' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.hospitalId} />
        {formik.errors.hospitalId&&formik.touched.hospitalId?<Alert severity="error"> {formik.errors.hospitalId} </Alert>:''}
        <select  id='case' name='case' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.case} className='my-2 input h-25' >
        <option>التشخيص</option>
            <option value="ذبحة صدرية">ذبحة صدرية</option>
            <option value="حوادث">حوادث</option>
            <option value="حروق">حروق</option>
            <option value="عيون">عيون</option>
            <option value="أزمة قلبية">أزمة قلبية</option>
            <option value="تسمم">تسمم</option>
            <option value="غيبوبة">غيبوبة</option>
            <option value="نسا وتوليد">نسا وتوليد</option>
            <option value="نزيف">نزيف</option>
            <option value="جلطات">جلطات</option>
        </select>
        {formik.errors.case&&formik.touched.case?<Alert severity="error"> {formik.errors.case} </Alert>:''}
        <select onChange={formik.handleChange} onBlur={formik.handleBlur} id='state' name='state' value={formik.values.state} className='input h-25'>
            <option>الحاله</option>
            <option value="Danger">Danger</option>
            <option value="stable">stable</option>
        </select>
        {formik.errors.state&&formik.touched.state?<Alert severity="error"> {formik.errors.state} </Alert>:''}
        <div className='col-4 d-flex justify-content-center align-items-center'>
          <button className='btn botton my-2 text-light' type='submit'>تاكيد</button>
        </div>
       </form>

    </div>
  )
}
