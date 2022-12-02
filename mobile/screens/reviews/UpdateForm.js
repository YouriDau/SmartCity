import ReviewForm from "../../components/ReviewForm";

const UpdateForm = ({ navigation, route }) => {
  const review = route.params.review;
  const toiletId = route.params.toiletId;

  return (
    <ReviewForm
      isUpdate={true}
      navigation={navigation}
      toiletId={toiletId}
      review={review}
    />
  );
};

export default UpdateForm;
