import { useField } from "remix-validated-form";

const Field: React.FC<{
  component: React.FC<{ name: string; [x: string]: any }>;
  name: string;
  [x: string]: any;
}> = ({ component: Component, name, ...props }) => {
  const { error, getInputProps } = useField(name);

  const formProps = getInputProps({ id: name }) as any;

  return (
    <Component
      {...formProps}
      {...props}
      error={!!error}
      helperText={!!error ? error : props?.helperText}
      defaultValue={formProps?.defaultValue ?? ""}
    />
  );
};

export default Field;
