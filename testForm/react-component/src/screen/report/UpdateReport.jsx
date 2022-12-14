import React from "react";
import Header from "../../component/Header";
import ReportForm from "../../component/ReportForm";
//import { updateReportFetch } from "../../component/API/useFetchReport";
import { getReportByIdFetch } from "../../component/API/useFetchReport";
import {useParams} from 'react-router-dom';

function withParams(Component) {
  return props => <Component {...props} params={useParams()} />;
}

class UpdateReport extends React.Component {
  constructor(props) {
    super(props);
    const id = parseInt(this.props.params.id)
    this.state = {
      id,
      report: "",
    };
  }

  componentDidMount() {
    getReportByIdFetch(this.state.id).then((report) => {
      this.setState({report : report});
    })
  }

  render() {
    return (
      <div>
        <div>
          <Header />
        </div>
        <ReportForm
          title={"Update this report"}
          titleButton={"Save"}
          isReport={true}
          handlePress={this.handlePressUpdate}
          isUpdate={true}
          currentReport={this.state.report}
        />
      </div>
    );
  }
}

export default withParams(UpdateReport);
