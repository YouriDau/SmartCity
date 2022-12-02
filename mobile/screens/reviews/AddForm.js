import ReviewForm from "../../components/ReviewForm";

const AddForm = ({ navigation, route }) => {
  const { toiletId } = route.params;
  return (
    <ReviewForm isUpdate={false} navigation={navigation} toiletId={toiletId} />
  );
};

export default AddForm;
