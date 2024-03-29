/**
 * Renders a labeled input field with customizable properties.
 * This component encapsulates a common form input pattern including a label and an input field,
 * providing a consistent look and feel across the application's forms.
 *
 * @param {Object} props The properties for the Input component.
 * @param {string} props.label The text label associated with the input field.
 * @param {string} props.id A unique identifier for the input field, used to associate the label with the input element.
 * @param {string} props.type The type of the input field (e.g., 'text', 'email', 'password').
 * @param {string} props.value The current value of the input field, making this a controlled component.
 * @param {Function} props.onChange The event handler function that updates the state based on input changes, ensuring the input field is controlled.
 * @param {string} [props.placeholder=""] An optional placeholder text to be displayed in the input field when it is empty.
 * @param {boolean} [props.required=true] Indicates whether the input field is required for form submission. Defaults to true.
 *
 * @returns {React.Component} The Input component that renders a label and an input field.
 */
function Input({ label, id, type, value, onChange, placeholder = "", required = true }) {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <input type={type} className="form-control" id={id} value={value} onChange={onChange} placeholder={placeholder} required={required} />
    </div>
  );
}

export default Input;
