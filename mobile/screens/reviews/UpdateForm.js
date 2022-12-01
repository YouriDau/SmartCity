import ReviewForm from "../../components/ReviewForm";

const UpdateForm = ({ navigation, route }) => {
  const id = route.params.id;

  return <ReviewForm isUpdate={true} navigation={navigation} id={id} />;
};

export default UpdateForm;
