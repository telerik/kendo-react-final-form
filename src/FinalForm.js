import React, { Component } from 'react'
import { Form, Field } from 'react-final-form'
import { Input, NumericTextBox, Switch } from '@progress/kendo-react-inputs'
import { DatePicker } from '@progress/kendo-react-dateinputs'
import { DropDownList } from '@progress/kendo-react-dropdowns';

const onSubmit = async values => {
    window.alert(JSON.stringify(values, 0, 2))
}

class FinalForm extends Component {
    state = {
        departureCity: "",
        arrivalCity: "",
        numberOfPassengers: 1,
        departureDate: new Date(),
        arrivalDate: new Date(),
        class: "Economy",
        directFlight: false
    };

    onReset = () => {
        this.setState({
            departureCity: "",
            arrivalCity: "",
            numberOfPassengers: 1,
            departureDate: new Date(),
            arrivalDate: new Date(),
            class: "Economy",
            directFlight: false
        })
    }

    onChangeDepartureCity = (event) => {
        this.setState({ departureCity: event.value })
    }

    onChangeArrivalCity = (event) => {
        this.setState({ arrivalCity: event.value })
    }

    onChangeDepartureDate = (event) => {
        if (this.state.departureDate !== event.value && event.value !== null) {
            this.setState({ departureDate: event.value })
        }
    }

    onChangeArrivalDate = (event) => {
        if (this.state.arrivalDate !== event.value && event.value !== null) {
            this.setState({ arrivalDate: event.value })
        }
    }

    KendoInput = ({
        input,
        meta,
        ...rest
    }) => (

            <label className="k-form-field">
                <span>{rest.label}</span>
                <Input
                    {...input}
                    onChange={input.name === "departureCity"
                        ? this.onChangeDepartureCity
                        : this.onChangeArrivalCity} /> {meta.error && meta.touched && <span className="k-required">{meta.error}</span>}
            </label>
        )

    KendoNumericTextBox = ({
        input,
        meta,
        ...rest
    }) => (
            <label className="k-form-field">
                <span>{rest.label}</span>
                <NumericTextBox
                    {...input}
                    min={1}
                    onChange={(event) => this.setState({
                        numberOfPassengers: event.value !== null
                            ? event.value
                            : 1
                    })} /> {meta.error && meta.touched && <span className="k-required">{meta.error}</span>}
            </label>
        )

    KendoDatePicker = ({
        input,
        meta,
        ...rest
    }) => (
            <label className="k-form-field">
                <span>{rest.label}</span>
                <DatePicker
                    {...input}
                    onChange={input.name === "departureDate"
                        ? this.onChangeDepartureDate
                        : this.onChangeArrivalDate} /> {meta.error && meta.touched && <span className="k-required">{meta.error}</span>}
            </label>
        )

    KendoDropDown = ({
        input,
        meta,
        ...rest
    }) => (
            <label className="k-form-field">
                <span>{rest.label}</span>
                <DropDownList
                    {...input}
                    data={["Economy", "Premium Economy", "Business", "First Class"]}
                    onChange={(event) => this.setState({ class: event.target.value })} />
            </label>
        )

    KendoSwitch = ({
        input,
        meta,
        ...rest
    }) => (
            <label className="k-form-field">
                <span>{rest.label}</span>
                <Switch
                    {...input}
                    onLabel={"YES"}
                    offLabel={"NO"}
                    onChange={(event) => this.setState({ directFlight: event.value })} />
            </label>
        )
    render() {
        return (
            <div className="row">
                <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12 container mt-3 border border-light active shadow">
                    <div className="header mt-3">
                        <h5>Flight Search</h5>
                    </div>
                    <Form
                        validate={values => {
                            const errors = {};
                            if (!values.departureCity) {
                                errors.departureCity = "Departure city is Required";
                            }
                            if (!values.arrivalCity) {
                                errors.arrivalCity = "Аrrival city is Required";
                            }
                            if (!values.numberOfPassengers) {
                                errors.numberOfPassengers = "Required";
                            } else if (values.numberOfPassengers > 40) {
                                errors.numberOfPassengers = "The maximun passengers per registration is 40";
                            }
                            if (!values.departureDate) {
                                errors.departureDate = "Please select a departure date";
                            }
                            if (!values.arrivalDate) {
                                errors.arrivalDate = "Please select an arrival date";
                            }
                            let todaysDate = new Date();
                            todaysDate.setHours(0, 0, 0, 0);
                            let departureDatevalue = new Date(values.departureDate)
                            let arrivalDatevalue = new Date(values.arrivalDate);
                            departureDatevalue.setSeconds(departureDatevalue.getSeconds() + 1);
                            arrivalDatevalue.setSeconds(arrivalDatevalue.getSeconds() + 2);
                            if (departureDatevalue <= todaysDate) {
                                errors.departureDate = "The departure date cannot be in the past";
                            } else if (departureDatevalue > arrivalDatevalue) {
                                errors.arrivalDate = "The arrival cannot be before departure date";
                            }
                            return errors;
                        }}
                        onSubmit={onSubmit}
                        initialValues={this.state}
                        render={({ handleSubmit, reset, submitting, pristine, values, valid }) => (
                            <form onSubmit={handleSubmit} className="k-form">
                                <fieldset>
                                    <Field name="departureCity" label="Where from?" component={this.KendoInput} />
                                    <Field name="arrivalCity" label="Where to?" component={this.KendoInput} />
                                    <Field
                                        name="numberOfPassengers"
                                        component={this.KendoNumericTextBox}
                                        label="Select the number of passengers?" />
                                    <Field
                                        name="departureDate"
                                        component={this.KendoDatePicker}
                                        label="Departure date" />
                                    <Field
                                        name="arrivalDate"
                                        component={this.KendoDatePicker}
                                        label="Arrival date" />
                                    <Field name="class" component={this.KendoDropDown} label="Choose class" />
                                    <Field
                                        name="directFlight"
                                        component={this.KendoSwitch}
                                        label="Only direct flights" />
                                    <div className="buttons float-right">
                                        <button type="submit" className="k-button k-primary" disabled={submitting}>
                                            Search flights
                                        </button>
                                        &nbsp;
                                        <button
                                            type="button"
                                            className="k-button"
                                            onClick={this.onReset}>
                                            Reset
                                        </button>
                                    </div>
                                </fieldset>
                            </form>
                        )} />
                </div>
            </div>
        )
    }
}

export default FinalForm