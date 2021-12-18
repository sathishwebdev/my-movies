import React from 'react'
import { Formik } from 'formik'

function FormikForm() {
    return (
      <div>
        <Formik 
        initialValues={{ email: "Sk@mail.com", password: "" }}
        // onSubmit={(values)=>{
        //     console.log(values)
        // }}
        >
          {({ values, handleChange, handleBlur }) => (
            <form >
              <input
                type="email"
                id="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Email"
                value={values.email}
              />
              <input
                id="password"
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Password"
                value={values.password}
              />
              <input type="submit" />
            </form>
          )}
        </Formik>
      </div>
    );
}

export default FormikForm
