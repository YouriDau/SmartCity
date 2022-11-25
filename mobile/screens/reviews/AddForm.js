import ReviewForm from "../../components/ReviewForm";

const AddForm = ({ navigation, route }) => {
  const { toiletId } = route.params;
  return (
    <ReviewForm isUpdate={false} toiletId={toiletId} navigation={navigation} />
  );
};

export default AddForm;
