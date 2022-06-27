import React, { FC } from 'react';
import { FilterType } from '../redux/usersReducer';
import { Field, Form, Formik } from "formik";


export type FilterPropsType = {
    onFilterChange: (filter: FilterType) => void

}


const UsersSearchForm: FC<FilterPropsType> = (props) => {
    return <div>
        <Formik
            initialValues={{ term: '', friend: '' }}
            validate={values => {
                const errors = {}
                return errors;
            }}
            onSubmit={(values: FilterType, { setSubmitting }) => {
                props.onFilterChange(values)
                setSubmitting(false)

            }}
        >

            {({ isSubmitting }) => (
                <Form>
                    <Field type="text" name="term" placeholder='search' />
                    <Field name="friend" as="select">
                        <option value="null">All</option>
                        <option value="true">Only followed</option>
                        <option value="false">Only unFollowed</option>
                    </Field>
                    <button type="submit" disabled={isSubmitting}>
                        Search
                    </button>
                </Form>
            )}
        </Formik>

    </div>
}

export default UsersSearchForm;
