/* eslint-disable react-native/no-inline-styles */
import React, { Component } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";


import {
  Container,
  Content,
  List,
  ListItem,
  Separator,
  Icon,
  Text,
  Left,
  Right,
  Thumbnail,
  Input,
} from "native-base";
import DateTimePicker from "@react-native-community/datetimepicker";

import { Radio, Picker, DatePicker } from "components/ui";

import moment from "moment";
import { Avatar } from "react-native-elements";
import { getParams, getParamsHeader } from "../../../utils";

import * as actions from "actions";
import * as types from "actionTypes";
import configs from "configs/server.config";
import { getRequest, postRequest } from "utils/request";
import { navigate, goBack, showPicker } from "utils/navigate";

class EmployeeInfo extends Component {
  constructor(props) {
    super(props);
    console.log("EmpInfor View");
    console.log(this.props);
    this.state = {
      date: null,
    };
  }

  handleTextInput = (value, key) => {
    this.setState({ [key]: value });
  };

  componentDidMount = () => {
    this.props.navigation.setParams({ onPressHeader: this.onPressHeader });
    this.setState(getParams(this.props).data);
  };

  onPressHeader = () => {
    console.log("onPressed Header");
    getParams(this.props).onPress(this.state);
  };

  static navigationOptions = ({ navigation }) => {
    const params = getParamsHeader(navigation);

    console.log(`Params: ${params}`);
    return {
      headerRight: (
        <TouchableOpacity
          style={{ paddingRight: 15 }}
          onPress={() => params.onPressHeader()}
        >
          <Text style={{ color: "white", fontSize: 18 }}>Lưu</Text>
        </TouchableOpacity>
      ),
      headerTitle: () => (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ color: "white", fontSize: 18 }}>
            Quản lý tài khoản
          </Text>
        </View>
      ),
    };
  };

  setDate = (date) => {
    this.setState({
      birth: date,
    });
  };

  onSexRadioChange = (value) => {
    console.log("onSexRadioChange", value);
    this.setState({ sex: value });
  };

  onValueChange = (value) => {
    this.setState({ selected: value });
  };

  onSelectBranch = (branch) => {
    this.setState({ branch: branch, branch_id: branch.id });
    goBack();
  };

  onSelectDept = (dep) => {
    this.setState({ dep: dep, dep_id: dep.id });
    goBack();
  };

  render() {
    const { birth } = this.state;

    console.log(this.state, this.props);

    return (
      <Container>
        <Content>
          <View
            style={{
              flex: 1,
              backgroundColor: "#e3e7eb",
              alignItems: "center",
              justifyContent: "center",
              paddingTop: 10,
            }}
          >
            <Thumbnail
              style={{ height: 150, width: 150 }}
              source={require("../../image/admin.png")}
            />
          </View>
          <Separator group bordered>
            <Text>Thông tin cá nhân</Text>
          </Separator>
          <ListItem>
            <Left>
              <Text>Mã NV</Text>
            </Left>
            <Right>
              <Text numberOfLines={1}>{this.state.id}</Text>
            </Right>
          </ListItem>

          <ListItem>
            <Left>
              <Text>Họ tên</Text>
            </Left>
            <Right>
              <Input
                onChangeText={(text) => this.handleTextInput(text, "name")}
                style={styles.inputTxt}
                placeholder="Tên NV"
                value={this.state.name}
              />
            </Right>
          </ListItem>

          <ListItem>
            <Left>
              <Text>Giới tính</Text>
            </Left>
            <Right>
              <View style={styles.txtContent}>
                <Radio
                  title="Nam"
                  value="1"
                  checked={this.state.sex}
                  onPress={this.onSexRadioChange}
                />
                <Radio
                  title="Nữ"
                  value="0"
                  checked={this.state.sex}
                  onPress={this.onSexRadioChange}
                />
              </View>
            </Right>
          </ListItem>

          <ListItem>
            <Left>
              <Text>Địa chỉ</Text>
            </Left>
            <Right>
              <Input
                onChangeText={(text) => this.handleTextInput(text, "address")}
                style={styles.inputTxt}
                placeholder="Địa chỉ"
                value={this.state.address}
              />
            </Right>
          </ListItem>

          <ListItem>
            <Left>
              <Text>Ngày sinh</Text>
            </Left>
            <Right>
              <DatePicker
                value={birth}
                onChange={this.setDate}
                placeholder="Ngày sinh"
              />
            </Right>
          </ListItem>

          <ListItem last>
            <Left>
              <Text>Số điện thoại</Text>
            </Left>
            <Right>
              <Text>{this.state.phone_number}</Text>
            </Right>
          </ListItem>

          <Separator group bordered>
            <Text>Công ty</Text>
          </Separator>

          <ListItem>
            <Left>
              <Text>Tên công ty</Text>
            </Left>
            <Right>
              <Text>{this.state.shop && this.state.shop.name}</Text>
            </Right>
          </ListItem>
          <ListItem>
            <Left>
              <Text>Phòng ban</Text>
            </Left>
            <Right>
              <Picker
                displayText={this.state.dep && this.state.dep.name}
                onSelection={this.onSelectDept}
                selectedOptions={[this.state.dep]}
                placeholder="Chọn phòng ban"
                multiple={false}
                route="dep/list"
              />
            </Right>
          </ListItem>
          <ListItem last>
            <Left>
              <Text>Chi nhánh</Text>
            </Left>
            <Right>
              <Picker
                displayText={this.state.branch && this.state.branch.name}
                onSelection={this.onSelectBranch}
                selectedOptions={[this.state.branch]}
                placeholder="Chọn chi nhánh"
                multiple={false}
                route="branch/list"
              />
            </Right>
          </ListItem>
        </Content>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  txtContent: {
    flexDirection: "row",
  },
  MainContainer: {
    flex: 1,
    backgroundColor: "#FFF8E1",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Platform.OS === "ios" ? 20 : 0,
  },
  txtInfo: {
    color: "#9c9c9c",
    fontSize: 16,
    textAlign: "auto",
    borderStyle: "solid",
  },

  inputTxt: {
    height: 30,
    padding: 0,
    fontSize: 14,
  },

  txtSperator: {
    fontSize: 20,
  },
  raido: {
    flexDirection: "row",
    marginRight: 5,
  },
});

export default EmployeeInfo;
