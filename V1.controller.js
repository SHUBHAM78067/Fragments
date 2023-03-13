var that_V1 = this;
jQuery.sap.require("sap.m.MessageBox");

sap.ui.controller("DailHuddleMeeting.view.V1", {

	onInit: function() {
		that_V1 = this;


		that_V1.oDataModel = this.getOwnerComponent().getModel();
		var dateFormat1 = sap.ui.core.format.DateFormat.getDateInstance({
			pattern: "MM-yyyy"
		});
		var dateFormat2 = sap.ui.core.format.DateFormat.getDateInstance({
			pattern: "dd-MMM-yyyy"
		});
		var dates = new Date();
		var dateval = dateFormat1.format(dates);
		var dateval2 = dateFormat2.format(dates);
		that_V1.byId("genTrip_btnId").addStyleClass("buttoncolor1 .sapMBtnInner");
		that_V1.byId("MonthCombo").setSelectedKey(dateval.split("-")[0]);
		that_V1.byId("YearCombo").setSelectedKey(dateval.split("-")[1]);
		that_V1.byId("headerTiltle").setText("DAILY HUDDLE MEETING (" + dateval2 + ")");

		if (!that_V1._dialog) {
			that_V1._dialog = sap.ui.xmlfragment("DailHuddleMeeting.view.fragments.BusyDialog", this);
			that_V1.getView().addDependent(that_V1._dialog);
		}

		// this.byId("DP10").setValue(dateval);
		that_V1.busyDialog = new sap.m.BusyDialog();
		var oData = {
			results: []
		};
		var json = new sap.ui.model.json.JSONModel({
			results: []
		});
		for (var i = 1; i <= 9; i++) {
			this.byId("uiTab" + i).setModel(json);
		}
		this.byId("uiTab12").setModel(json);

		that_V1.byId("dealerCombo").setModel(json);
		that_V1.sRootPath = jQuery.sap.getModulePath("DailHuddleMeeting");
		this.byId("custIconDetail2").setSrc(that_V1.sRootPath + "/model/logo.png");
		jQuery.sap.setIcons({
			favicon: that_V1.sRootPath + "/model/EICHER.png"
				// ...
		});
		var cururl = window.location.protocol + "//" + window.location.host;
		$.ajax({
			url: cururl + "/sap/bc/ui2/start_up",
			async: false,
			success: function(evt) {
				that_V1.UserID = evt.id;
			}
		});
		this._oMultiInput = this.getView().byId("invfromtyp_inpId");
		that_V1.TabBar0(true, true, false, false, false);
		that_V1.bindDealers();
		that_V1.byId("ojctb").addStyleClass("buttoncolor .sapMBtnInner");
		that_V1.MSLAPress = "";
		that_V1.RMSLAPress = "";
		that_V1.OEOSPress = "";
		that_V1.RSMSLAPress = "";
		that_V1.MSLAPress = "";
		that_V1.OCPress = "";
		that_V1.MSLACPress = "";
		that_V1.RVPress = "";
		that_V1.CASEMPress = "";
		// ================
		that_V1.floatUsage = "";
		that_V1.EPOD_GRNPress = "";

		that_V1.OpenJC = [];
		that_V1.MSLA = [];
		that_V1.Revisit = [];
		that_V1.OpenEOS = [];
		that_V1.RMSLA = [];
		that_V1.RESMSLA = [];
		that_V1.OpenComp = [];
		that_V1.MSLAC = [];
		that_V1.CASEM = [];
		//====================
		that_V1.EPOD_GRNP = [];
		that_V1.PI = [];
	},
	colorcodeVisible: function(val) {
		if (val === "HD") {
			return true;
		} else {
			return false;
		}
	},
	colorcode: function(val) {
		if (val === null) {
			return "red";
		} else {
			return "#009de0";
		}
	},
	// Dealer Code Binding 
	bindDealers: function() {
		that_V1.busyDialog.open();
	
		that_V1.oDataModel.read("/ET_DLR_AUTH_AMSet?$filter=UserId eq ('" + that_V1.UserID + "')", {
			success: function(oData, oResp) {
				that_V1.busyDialog.close();
				var json = new sap.ui.model.json.JSONModel(oData);
				json.setSizeLimit(oData.results.length);
				that_V1.byId("dealerCombo").setModel(json);

			},
			error: function(oErr) {
				that_V1.busyDialog.close();
				var message = JSON.parse(oErr.response.body).error.message.value;
				sap.m.MessageBox.show(message, {
					title: "Message",
					styleClass: "sapUiSizeCompact",
					icon: sap.m.MessageBox.Icon.ERROR,
					actions: [sap.m.MessageBox.Action.OK],
					onClose: function(oAction) {

					}
				});
			}

		});
	},
	//Date Function
	DateFunc: function() {

	

		var date = that_V1.byId("MonthCombo").getSelectedKey() + "." + that_V1.byId("YearCombo").getSelectedKey();
		return date;
	},

	//Date change Event
	handleDateChange: function() {
		that_V1.byId("proceedbtn").setText("Proceed");
		that_V1.MSLAPress = "";
		that_V1.RMSLAPress = "";
		that_V1.OEOSPress = "";
		that_V1.RSMSLAPress = "";
		that_V1.MSLAPress = "";
		that_V1.OCPress = "";
		that_V1.MSLACPress = "";
		that_V1.RVPress = "";
		that_V1.CASEMPress = "";
		that_V1.EPOD_GRNPress = "";
		that_V1.floatUsage = "";
	},
	onSelectMonthnYear: function() {
		that_V1.byId("proceedbtn").setText("Proceed");
		that_V1.MSLAPress = "";
		that_V1.RMSLAPress = "";
		that_V1.OEOSPress = "";
		that_V1.RSMSLAPress = "";
		that_V1.MSLAPress = "";
		that_V1.OCPress = "";
		that_V1.MSLACPress = "";
		that_V1.RVPress = "";
		that_V1.CASEMPress = "";
		that_V1.EPOD_GRNPress = "";
		that_V1.floatUsage = "";
	},

	//Proceed Button Event
	onProceed: function(evt) {
		if (!this._dialog) {
			this._dialog = sap.ui.xmlfragment("DailHuddleMeeting.view.fragments.BusyDialog", this);
			this.getView().addDependent(this._dialog);
		}

		// open dialog
		jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._dialog);
		this._dialog.open();

		_timeout = jQuery.sap.delayedCall(4000, this, function() {
			this._dialog.close();
		});
		if (evt.getSource().getText() === "Proceed") {
			that_V1.byId("simTrip_btnId").setVisible(true);
			that_V1.byId("genTrip_btnId").setVisible(true);
			that_V1.byId("idSubmitAll").setVisible(true);
			var busyDialog = new sap.m.BusyDialog();
			var dateFormat1 = sap.ui.core.format.DateFormat.getDateInstance({
				pattern: "yyyy-MM-ddTHH:mm:ss"
			});
			that_V1.StartDate = dateFormat1.format(new Date());

			var time = that_V1.StartDate.split("T")[1].split(":");
			that_V1.StartTime = "PT" + time[0] + "H" + time[1] + "M" + time[2] + "S";
			var delkey = that_V1.byId("dealerCombo").getSelectedKey();
			var month = that_V1.byId("MonthCombo").getSelectedKey();
			var year = that_V1.byId("YearCombo").getSelectedKey();
			//var Month = that_V1.byId("DP10").getValue();

			if (delkey === "" && month === "" && year === "") {
				sap.m.MessageToast.show("Select Dealer Code , Month and Year");
				return;
			}
			if (delkey === "") {
				sap.m.MessageToast.show("Select Dealer Code");
				return;
			}
			if (month === "" || year === "") {
				sap.m.MessageToast.show("Select Month & Year");
				return;
			}
			busyDialog.open();
			evt.getSource().setText("Edit");
			this.byId("ITBId").setVisible(true);

			this.byId("ITBId").setSelectedKey("OJKey");
			that_V1.onPressOJC();
			this.byId("dealerCombo").setEnabled(false);
			this.byId("MonthCombo").setEnabled(false);
			this.byId("YearCombo").setEnabled(false);
			//this.byId("DP10").setEnabled(false);
			if (that_V1.OpenJC.length === 0) {
				that_V1.readHuddleValue("OPEN JC");
			}

			that_V1.bindJCTable(delkey);
			that_V1.readOpenJC();
			that_V1.bindJCKPI(delkey);

		
			busyDialog.close();
		} else {
			this.byId("dealerCombo").setEnabled(true);
			this.byId("MonthCombo").setEnabled(true);
			this.byId("YearCombo").setEnabled(true);
			//this.byId("DP10").setEnabled(true);

		}
	},

	onRemarksChange: function(oEvent) {
		debugger;
	
	},

	onFloatUsedChange: function(oEvent) {
		debugger;
		var oFloatUsed = oEvent.getSource().getSelectedItem().getKey();
		if (oFloatUsed === '') {
			oEvent.getSource().setValueState("Error");
			sap.m.MessageToast.show("Mandatory field Float Used");
		} else {
			oEvent.getSource().setValueState("None");
		}
	},

	readHuddleValue: function(key) {
		//that_V1.busyDialog.open();
		var busyDialog = new sap.m.BusyDialog();
		busyDialog.open();
		var OdataModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZAM_HDL_DROPDOWN_BW_SRV", true);
		OdataModel.read("/ET_HDL_DROPDOWNSet?$filter=HuddleKey eq '" + key + "'", {
			async: false,
			success: function(oData, oResp) {
				//that_V1.busyDialog.close(); 
				oData.results.splice(0, 0, {
					DropDownKey: "",
					DropdownValue: ""
				});
				if (key === "OPEN JC") {

					var json = new sap.ui.model.json.JSONModel(oData.results);
					that_V1.getView().setModel(json, "OpenJC");
				}
				if (key === "MISSED SLA") {
					var json1 = new sap.ui.model.json.JSONModel(oData.results);
					that_V1.getView().setModel(json1, "MSLA");
				}
				if (key === "REVISIT") {
					var json2 = new sap.ui.model.json.JSONModel(oData.results);
					that_V1.getView().setModel(json2, "RV");
				}
				if (key === "OPEN EOS") {
					var json3 = new sap.ui.model.json.JSONModel(oData.results);
					that_V1.getView().setModel(json3, "OEOS");
				}
				if (key === "REACH MISSED SLA") {
					var json4 = new sap.ui.model.json.JSONModel(oData.results);
					that_V1.getView().setModel(json4, "RMSLA");
				}
				if (key === "RESOLUTION MISSED SLA") {
					var json5 = new sap.ui.model.json.JSONModel(oData.results);
					that_V1.getView().setModel(json5, "RSMSLA");
				}
				if (key === "OPEN COMPLAINTS") {
					var json6 = new sap.ui.model.json.JSONModel(oData.results);
					that_V1.getView().setModel(json6, "OCOMP");
				}
				if (key === "MISSED SLA COMPLAINTS") {
					var json7 = new sap.ui.model.json.JSONModel(oData.results);
					that_V1.getView().setModel(json7, "MSLAC");
				}
				if (key === "OPEN CASES") {
					var json8 = new sap.ui.model.json.JSONModel(oData.results);
					that_V1.getView().setModel(json8, "OCASE");
				}
				if (key === "PIADH") {
					var json9 = new sap.ui.model.json.JSONModel(oData.results);
					that_V1.getView().setModel(json9, "PIADH");
				}
				if (key === "PISTOCK") {
					var json10 = new sap.ui.model.json.JSONModel(oData.results);
					that_V1.getView().setModel(json10, "PISTOCK");
				}
				if (key === "EPOD") {
					var json11 = new sap.ui.model.json.JSONModel(oData.results);
					that_V1.getView().setModel(json11, "EPGP"); //  NAME MODEL
				}

				busyDialog.close();

			},
			error: function(oErr) {
				busyDialog.close();
				var message = JSON.parse(oErr.response.body).error.message.value;
				sap.m.MessageBox.show(message, {
					title: "Message",
					styleClass: "sapUiSizeCompact",
					icon: sap.m.MessageBox.Icon.ERROR,
					actions: [sap.m.MessageBox.Action.OK],
					onClose: function(oAction) {

					}
				});
				//that_V1.busyDialog.close();

			}

		});
	},

	onEPODStatusSelect: function(evt) {
		var selectedKey = evt.getParameters().selectedItem.getKey();
		var tableId = that_V1.getView().byId("idEpod_Grn_Table");
		var tableModel = tableId.getModel();
		var oItems = tableModel.getData().results;
		var indexofSelectedItem = evt.getSource().getParent().getBindingContext().getPath().split("/results/")[1];
		var tableInVoiceNo = tableId.getBinding().oList[indexofSelectedItem].ZSER_IS03___F43;
		for (var i = 0; i < oItems.length; i++) {
			var inVoiceNo = tableId.getBinding().oList[i].ZSER_IS03___F43;
			if (inVoiceNo === tableInVoiceNo) {
				tableModel.getData().results[i].Status = selectedKey;
			}
		}
	},

	onReasonGapSelect: function(evt) {
		var selectedKey = evt.getParameters().selectedItem.getKey();
		var tableId = that_V1.getView().byId("idEpod_Grn_Table");
		var tableModel = tableId.getModel();
		var oItems = tableModel.getData().results;
		var indexofSelectedItem = evt.getSource().getParent().getBindingContext().getPath().split("/results/")[1];
		var tableInVoiceNo = tableId.getBinding().oList[indexofSelectedItem].ZSER_IS03___F43;
		for (var i = 0; i < oItems.length; i++) {
			var inVoiceNo = tableId.getBinding().oList[i].ZSER_IS03___F43;
			if (inVoiceNo === tableInVoiceNo) {
				tableModel.getData().results[i].ReasonForGap = selectedKey;
			}
		}
	},

	// Icon Tab Bar Selection Event
	onIcontabSelect: function(evt) {
		var key = evt.getSource().getSelectedKey();
		if (key === "OJKey") {
			var busyDialog = new sap.m.BusyDialog();
			busyDialog.open();
			that_V1.onPressOJC();
			busyDialog.close();

		} else if (key === "RVKey") {
			var busyDialog = new sap.m.BusyDialog();
			busyDialog.open();
			that_V1.onPressRV();
			busyDialog.close();

		} else if (key === "EOSKey") {
			var busyDialog = new sap.m.BusyDialog();
			busyDialog.open();
			that_V1.onPressOEOS();
			busyDialog.close();

		} else if (key === "CRMCKey") {

			var busyDialog = new sap.m.BusyDialog();
			busyDialog.open();
			that_V1.onPressOC();
			busyDialog.close();

		} else if (key === "CASEMKey") {
			var busyDialog = new sap.m.BusyDialog();
			busyDialog.open();
			that_V1.onPressCASEM();
			busyDialog.close();

		} else if (key === "PIKey") {
			var busyDialog = new sap.m.BusyDialog();
			busyDialog.open();

			that_V1.onPressPI();
			busyDialog.close();

		} else if (key === "PCKey") {
			var busyDialog = new sap.m.BusyDialog();
			busyDialog.open();
			that_V1.onPressPC();
			busyDialog.close();
		}
		// =================================================
		//  avnid
		else if (key === "epod_grnKey") {
			if (!this._dialog) {
				this._dialog = sap.ui.xmlfragment("DailHuddleMeeting.view.fragments.BusyDialog", this);
				this.getView().addDependent(this._dialog);
			}

			// open dialog
			jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._dialog);
			this._dialog.open();

			_timeout = jQuery.sap.delayedCall(5000, this, function() {
				this._dialog.close();
			});
			that_V1.onPressEPOD_GRN();

		}
		//=============================================

	},
	TabBar0: function(itm1, itm2, itm3, itm4, itm5) {
		var IcontTabBar = this.byId("ITBId");
		IcontTabBar.getItems()[0].getContent()[1].setVisible(itm1);
		IcontTabBar.getItems()[0].getContent()[2].setVisible(itm2);
		IcontTabBar.getItems()[0].getContent()[3].setVisible(itm3);
		IcontTabBar.getItems()[0].getContent()[4].setVisible(itm4);
		IcontTabBar.getItems()[0].getContent()[5].setVisible(itm5);
	},

	TabBar2: function(itm1, itm2, itm3, itm4, itm5, itm6) {
		var IcontTabBar = this.byId("ITBId");
		IcontTabBar.getItems()[2].getContent()[1].setVisible(itm1);
		IcontTabBar.getItems()[2].getContent()[2].setVisible(itm2);
		IcontTabBar.getItems()[2].getContent()[3].setVisible(itm3);
		IcontTabBar.getItems()[2].getContent()[4].setVisible(itm4);
		IcontTabBar.getItems()[2].getContent()[5].setVisible(itm5);
		IcontTabBar.getItems()[2].getContent()[6].setVisible(itm6);
	},
	TabBar3: function(itm1, itm2, itm3, itm4) {
		var IcontTabBar = this.byId("ITBId");
		IcontTabBar.getItems()[3].getContent()[1].setVisible(itm1);
		IcontTabBar.getItems()[3].getContent()[2].setVisible(itm2);
		IcontTabBar.getItems()[3].getContent()[3].setVisible(itm3);
		IcontTabBar.getItems()[3].getContent()[4].setVisible(itm4);

	},
	TabBar8: function(itm1, itm2, itm3, itm4) {
		var IcontTabBar = this.byId("ITBId");
		IcontTabBar.getItems()[8].getContent()[1].setVisible(itm1);
		IcontTabBar.getItems()[8].getContent()[2].setVisible(itm2);
		IcontTabBar.getItems()[8].getContent()[3].setVisible(itm3);
		IcontTabBar.getItems()[8].getContent()[4].setVisible(itm4);

	},
	TabBarPi: function(itm1, itm2) {
		var IcontTabBar = this.byId("ITBId");
		IcontTabBar.getItems()[5].getContent()[1].setVisible(itm1);
		IcontTabBar.getItems()[5].getContent()[2].setVisible(itm2);

	},
	onSelectReason: function(evt) {
		debugger;
		var ReasonForGapText = evt.getParameter('selectedItem').getText();
		var index = evt.getSource().getParent().getBindingContext().getPath().split("/results/")[1];
		evt.getSource().getParent().getModel().getData().results[index].ReasonForGapText = ReasonForGapText;
	},

	navBack: function() {
		var oCrossAppNavigator = sap.ushell.Container.getService("CrossApplicationNavigation");
		oCrossAppNavigator.toExternal({
			target: {
				shellHash: "#"
			}
		});
	},
	//open JC Button Event
	onPressOJC: function() {
		that_V1.byId("ojctb").setPressed(true);
		that_V1.byId("mslatb").setPressed(false);
		that_V1.byId("idFloatUsage").setPressed(false);
		that_V1.byId("ojctb").removeStyleClass("buttoncolor1 .sapMBtnInner");
		that_V1.byId("ojctb").addStyleClass("buttoncolor .sapMBtnInner");
		that_V1.byId("mslatb").removeStyleClass("buttoncolor .sapMBtnInner");
		that_V1.byId("mslatb").addStyleClass("buttoncolor1 .sapMBtnInner");
		that_V1.byId("idFloatUsage").removeStyleClass("buttoncolor .sapMBtnInner");
		that_V1.byId("idFloatUsage").addStyleClass("buttoncolor1 .sapMBtnInner");
		that_V1.TabBar0(true, true, false, false, false);
	},
	//Missed SLA button Event
	onPressMSLA: function(evt) {
		var busyDialog = new sap.m.BusyDialog();
		busyDialog.open();
		that_V1.byId("ojctb").setPressed(false);
		that_V1.byId("idFloatUsage").setPressed(false);
		that_V1.byId("ojctb").removeStyleClass("buttoncolor .sapMBtnInner");
		that_V1.byId("ojctb").addStyleClass("buttoncolor1 .sapMBtnInner");
		that_V1.byId("mslatb").removeStyleClass("buttoncolor1 .sapMBtnInner");
		that_V1.byId("mslatb").addStyleClass("buttoncolor .sapMBtnInner");
		that_V1.byId("idFloatUsage").removeStyleClass("buttoncolor .sapMBtnInner");
		that_V1.byId("idFloatUsage").addStyleClass("buttoncolor1 .sapMBtnInner");
		that_V1.TabBar0(false, false, true, true, false);
		var delkey = that_V1.byId("dealerCombo").getSelectedKey();
		var date = that_V1.DateFunc();
		if (that_V1.MSLA.length === 0) {
			that_V1.readHuddleValue("MISSED SLA");
		}
		if (that_V1.MSLAPress === "") {
			that_V1.MSLAPress = "X";
			that_V1.bindSLATable(delkey, date);
			that_V1.readMSLA();
			that_V1.bindSLAKPI(delkey, date);
			that_V1.bindSLAKPIWS(delkey, date);
		}
		busyDialog.close();
	},

	_bindFloatUsageTable: function() {
		debugger;
		var dealerCode = that_V1.byId("dealerCombo").getSelectedKey();
		var sNewDate = new Date();
		var sdateFormat = sNewDate.toJSON();
		var sDate = sdateFormat.split("T")[0] + "T00:00:00";
		var oTableData = [{
			"JcNo": "",
			"FloatPartNo": "",
			"FloatSerialNo": ""
		}, {
			"JcNo": "",
			"FloatPartNo": "",
			"FloatSerialNo": ""
		}, {
			"JcNo": "",
			"FloatPartNo": "",
			"FloatSerialNo": ""
		}, {
			"JcNo": "",
			"FloatPartNo": "",
			"FloatSerialNo": ""
		}, {
			"JcNo": "",
			"FloatPartNo": "",
			"FloatSerialNo": ""
		}, {
			"JcNo": "",
			"FloatPartNo": "",
			"FloatSerialNo": ""
		}, {
			"JcNo": "",
			"FloatPartNo": "",
			"FloatSerialNo": ""
		}, {
			"JcNo": "",
			"FloatPartNo": "",
			"FloatSerialNo": ""
		}, {
			"JcNo": "",
			"FloatPartNo": "",
			"FloatSerialNo": ""
		}, {
			"JcNo": "",
			"FloatPartNo": "",
			"FloatSerialNo": ""
		}];
		var oTableModel = new sap.ui.model.json.JSONModel(oTableData);
		that_V1.getView().setModel(oTableModel, "oFloatUsageModel");
		var oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZAM_FLOAT_HDL_BW_SRV", true);
		var oPath = "/ET_AM_FLOAT_HDL_BWSet?$filter=DealerCode eq '" + dealerCode + "' and HuddleDate eq datetime'" + sDate + "'";
		oModel.read(oPath, {
			success: function(oData, response) {
				debugger;
				var idtable = that_V1.getView().byId("idFloatTable");
				var oRows = idtable.getRows();
				for (var i = 0; i < oData.results.length; i++) {
					oRows[i].getCells()[0].setValue(oData.results[i].JcNo);
					oRows[i].getCells()[1].setValue(oData.results[i].FloatPartNo);
					oRows[i].getCells()[2].setValue(oData.results[i].FloatSerialNo);
				}
			}.bind(that_V1),
			error: function(oError) {
				// do nothing
				debugger;
			}.bind(that_V1)
		});

	},
	onPressFloatUsage: function(evt) {
		debugger;
		var busyDialog = new sap.m.BusyDialog();
		busyDialog.open();
		that_V1.byId("ojctb").setPressed(false);
		that_V1.byId("ojctb").removeStyleClass("buttoncolor .sapMBtnInner");
		that_V1.byId("ojctb").addStyleClass("buttoncolor1 .sapMBtnInner");
		that_V1.byId("mslatb").setPressed(false);
		that_V1.byId("mslatb").removeStyleClass("buttoncolor .sapMBtnInner");
		that_V1.byId("mslatb").addStyleClass("buttoncolor1 .sapMBtnInner");
		that_V1.byId("idFloatUsage").removeStyleClass("buttoncolor1 .sapMBtnInner");
		that_V1.byId("idFloatUsage").addStyleClass("buttoncolor .sapMBtnInner");
		that_V1.TabBar0(false, false, false, false, true);
		that_V1._bindFloatUsageTable();
		busyDialog.close();
	},
	onJCChange: function(oEvent) {
		debugger;
		var sVal = oEvent.getSource().getValue();
		var sReplaceChar = sVal.replace(/[^0-9]/g, "");
		if (sReplaceChar.length > 10) {
			var sValTEN = sReplaceChar.slice(0, -1);
			oEvent.getSource().setValue(sValTEN);
		} else {
			oEvent.getSource().setValue(sReplaceChar);
		}


	},

	bindFloatUsageTable: function() {
	
	},

	onPressRV: function() {
		var delkey = that_V1.byId("dealerCombo").getSelectedKey();
		if (that_V1.Revisit.length === 0) {
			that_V1.readHuddleValue("REVISIT");
		}
		if (that_V1.RVPress === "") {
			that_V1.RVPress = "X";

			var date = that_V1.DateFunc();
			that_V1.bindRVKPI(delkey, date);
			that_V1.bindRVTable(delkey, date);
			that_V1.readRV();
		}
	},
	//open EOS button Event
	onPressOEOS: function() {
		that_V1.byId("oeostb").setPressed(true);
		that_V1.byId("remslatb").setPressed(false);
		that_V1.byId("rsmslatb").setPressed(false);
		var IcontTabBar = this.byId("ITBId");
		that_V1.byId("remslatb").removeStyleClass("buttoncolor .sapMBtnInner");
		that_V1.byId("rsmslatb").removeStyleClass("buttoncolor .sapMBtnInner");
		that_V1.byId("remslatb").addStyleClass("buttoncolor1 .sapMBtnInner");
		that_V1.byId("rsmslatb").addStyleClass("buttoncolor1 .sapMBtnInner");

		that_V1.byId("oeostb").removeStyleClass("buttoncolor1 .sapMBtnInner");
		that_V1.byId("oeostb").addStyleClass("buttoncolor .sapMBtnInner");
		that_V1.TabBar2(true, true, false, false, false, false);
		var delkey = that_V1.byId("dealerCombo").getSelectedKey();
		if (that_V1.OpenEOS.length === 0) {
			that_V1.readHuddleValue("OPEN EOS");
		}
		if (that_V1.OEOSPress === "") {
			that_V1.OEOSPress = "X";
			var date = that_V1.DateFunc();
			that_V1.bindRRKPI(delkey, date);

			that_V1.bindOpenEOSTable(delkey);
			that_V1.readOpenEOS();
		}

	},
	//Reach Missed SLA button Event
	onPressRCMSLA: function() {
		var busyDialog = new sap.m.BusyDialog();
		busyDialog.open();

		that_V1.byId("oeostb").setPressed(false);
		that_V1.byId("rsmslatb").setPressed(false);
		var IcontTabBar = this.byId("ITBId");
		that_V1.byId("oeostb").removeStyleClass("buttoncolor .sapMBtnInner");
		that_V1.byId("rsmslatb").removeStyleClass("buttoncolor .sapMBtnInner");
		that_V1.byId("oeostb").addStyleClass("buttoncolor1 .sapMBtnInner");
		that_V1.byId("rsmslatb").addStyleClass("buttoncolor1 .sapMBtnInner");
		that_V1.byId("remslatb").removeStyleClass("buttoncolor1 .sapMBtnInner");
		that_V1.byId("remslatb").addStyleClass("buttoncolor .sapMBtnInner");
		that_V1.TabBar2(false, false, true, true, false, false);
		var delkey = that_V1.byId("dealerCombo").getSelectedKey();
		if (that_V1.RMSLA.length === 0) {
			that_V1.readHuddleValue("REACH MISSED SLA");
		}
		if (that_V1.RMSLAPress === "") {
			that_V1.RMSLAPress = "X";
			var date = that_V1.DateFunc();

			that_V1.bindRRKPI(delkey, date);
			that_V1.bindRMSLATable(delkey, date);
			that_V1.readRMSLA();
			//that_V1.bindRMSLAKPT(delkey);
		}
		busyDialog.close();

	},
	//Resolution Missed SLA button Event
	onPressRSMSLA: function() {
		var busyDialog = new sap.m.BusyDialog();
		busyDialog.open();

		that_V1.byId("remslatb").setPressed(false);
		that_V1.byId("oeostb").setPressed(false);
		var IcontTabBar = this.byId("ITBId");
		that_V1.byId("oeostb").removeStyleClass("buttoncolor .sapMBtnInner");
		that_V1.byId("remslatb").removeStyleClass("buttoncolor .sapMBtnInner");
		that_V1.byId("oeostb").addStyleClass("buttoncolor1 .sapMBtnInner");
		that_V1.byId("remslatb").addStyleClass("buttoncolor1 .sapMBtnInner");
		that_V1.byId("rsmslatb").removeStyleClass("buttoncolor1 .sapMBtnInner");
		that_V1.byId("rsmslatb").addStyleClass("buttoncolor .sapMBtnInner");
		that_V1.TabBar2(false, false, false, false, true, true);
		if (that_V1.RESMSLA.length === 0) {
			that_V1.readHuddleValue("RESOLUTION MISSED SLA");
		}
		if (that_V1.RSMSLAPress === "") {
			that_V1.RSMSLAPress = "X";

			var delkey = that_V1.byId("dealerCombo").getSelectedKey();
			var date = that_V1.DateFunc();
			that_V1.bindRRKPI(delkey, date);
			that_V1.bindRSMSLATable(delkey, date);
			that_V1.readRSMSLA();
			//that_V1.bindRSMSLAKPT(delkey);
		}
		busyDialog.close();
	},
	//Open Complaints button Event
	onPressOC: function() {
		that_V1.byId("octb").setPressed(true);
		that_V1.byId("mslactb").setPressed(false);
		var IcontTabBar = this.byId("ITBId");
		that_V1.byId("mslactb").removeStyleClass("buttoncolor .sapMBtnInner");
		that_V1.byId("mslactb").addStyleClass("buttoncolor1 .sapMBtnInner");
		that_V1.byId("octb").removeStyleClass("buttoncolor1 .sapMBtnInner");
		that_V1.byId("octb").addStyleClass("buttoncolor .sapMBtnInner");
		that_V1.TabBar3(true, true, false, false);
		if (that_V1.OpenComp.length === 0) {
			that_V1.readHuddleValue("OPEN COMPLAINTS");
		}
		if (that_V1.OCPress === "") {
			that_V1.OCPress = "X";

			var delkey = that_V1.byId("dealerCombo").getSelectedKey();
			var date = that_V1.DateFunc();
			that_V1.bindCRMCKPI(delkey, date);
			that_V1.bindOCTable(delkey, date);
			that_V1.readOC();

		}
	},
	//Missed SLA Complaints button Event
	onPressMSLAC: function() {
		var busyDialog = new sap.m.BusyDialog();
		busyDialog.open();

		that_V1.byId("octb").setPressed(false);
		//that_V1.byId("mslactb").setPressed(false);
		var IcontTabBar = this.byId("ITBId");
		that_V1.byId("octb").removeStyleClass("buttoncolor .sapMBtnInner");
		that_V1.byId("octb").addStyleClass("buttoncolor1 .sapMBtnInner");
		that_V1.byId("mslactb").removeStyleClass("buttoncolor1 .sapMBtnInner");
		that_V1.byId("mslactb").addStyleClass("buttoncolor .sapMBtnInner");
		that_V1.TabBar3(false, false, true, true);
		if (that_V1.MSLAC.length === 0) {
			that_V1.readHuddleValue("MISSED SLA COMPLAINTS");
		}
		if (that_V1.MSLACPress === "") {
			that_V1.MSLACPress = "X";

			var delkey = that_V1.byId("dealerCombo").getSelectedKey();
			var date = that_V1.DateFunc();
			that_V1.bindCRMCKPI(delkey, date);
			that_V1.bindMSLACTable(delkey, date);
			that_V1.readMSLAC();

		}
		busyDialog.close();

	},
	onPressCASEM: function() {
		if (that_V1.CASEM.length === 0) {
			that_V1.readHuddleValue("OPEN CASES");
		}
		if (that_V1.CASEMPress === "") {
			that_V1.CASEMPress = "X";

			var delkey = that_V1.byId("dealerCombo").getSelectedKey();
			var date = that_V1.DateFunc();
			that_V1.bindCASEMTable(delkey, date);
			that_V1.readCASEM();

		}
	},
	// PI icontabbar press event
	onPressPI: function() {

		that_V1.readHuddleValue("PIADH");
		that_V1.readHuddleValue("PISTOCK");

		that_V1.readPIKPI();
		that_V1.bindPITable();
		that_V1.readPI();

	},
	bindADHDW: function() {

		var oDataModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZAM_PI_ADH_HDL_BW_SRV", true);
		oDataModel.read("/ET_PI_ADH_DROPDOWNSet", {
			async: false,
			success: function(oData, oResp) {
				oData.results.splice(0, 0, {
					Nonadhpireasonkey: "",
					Nonadhpireasontxt: ""
				});
				var json = new sap.ui.model.json.JSONModel(oData);
				that_V1.getView().setModel(json, "ADHPI");

			}
		});
	},
	bindADHDW1: function() {

		var oDataModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZAM_PI_ADH_HDL_BW_SRV", true);
		oDataModel.read("/ET_PI_ADH_DROPDOWN1Set", {
			async: false,
			success: function(oData, oResp) {
				oData.results.splice(0, 0, {
					Nonadhstockadrekey: "",
					Nonadhstockadjretxt: ""
				});
				var json = new sap.ui.model.json.JSONModel(oData);
				that_V1.getView().setModel(json, "ADHPI1");

			}
		});
	},
	// avnFun
	onPressEPOD_GRN: function() {
		debugger;
		if (!this._dialog) {
			this._dialog = sap.ui.xmlfragment("DailHuddleMeeting.view.fragments.BusyDialog", this);
			this.getView().addDependent(this._dialog);
		}

		// open dialog
		jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._dialog);
		this._dialog.open();

		_timeout = jQuery.sap.delayedCall(5000, this, function() {
			this._dialog.close();
		});
		var delkey = that_V1.byId("dealerCombo").getSelectedKey();
		if (that_V1.EPOD_GRNP.length === 0) {
			// that_V1.readHuddleValue("EPOD_GRNP");
			that_V1.readHuddleValue("EPOD");
		}
		if (that_V1.EPOD_GRNPress === "") {
			that_V1.EPOD_GRNPress = "X";
			that_V1.bind_Sumry_KPI_EPOD_GRN_KPI(delkey);
			that_V1.bind_Sumry_EPOD_GRN_Table(delkey);
			that_V1.bind_KPI_EPOD_GRN_KPI(delkey);
			that_V1.bind_EPOD_GRN_Table(delkey);
			that_V1.read_EPOD_GRN();
			// that_V1.read_EPOD_Sumry_GRN();
		}

	},

	onPressPC: function() {

		that_V1.byId("actb").setPressed(false);
		//that_V1.byId("mslactb").setPressed(false);
		var IcontTabBar = this.byId("ITBId");
		that_V1.byId("actb").removeStyleClass("buttoncolor .sapMBtnInner");
		that_V1.byId("wctb").addStyleClass("buttoncolor .sapMBtnInner");
		that_V1.TabBar8(true, true, false, false);

	},
	onPressAC: function() {
		var busyDialog = new sap.m.BusyDialog();
		//busyDialog.open();
		that_V1.byId("wctb").setPressed(false);
		//that_V1.byId("mslactb").setPressed(false);
		var IcontTabBar = this.byId("ITBId");
		that_V1.byId("wctb").removeStyleClass("buttoncolor .sapMBtnInner");
		that_V1.byId("actb").addStyleClass("buttoncolor .sapMBtnInner");
		that_V1.TabBar8(false, false, true, true);

	},
	readPIKPI: function() {
		var delkey = that_V1.byId("dealerCombo").getSelectedKey();
		var date = that_V1.DateFunc();
		var oDataModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZSER_M95_Q0002_SRV", true);
		var Url = "/ZSER_M95_Q0002(ZPLANTVAR1='" + delkey + "',ZCAL_MONTH1='" + date + "')/Results";
		that_V1.bindGenericKPI(oDataModel, Url);
	},
	onSelectDealer: function(evt) {
		this.byId("proceedbtn").setText("Proceed");
		that_V1.MSLAPress = "";
		that_V1.RMSLAPress = "";
		that_V1.OEOSPress = "";
		that_V1.RSMSLAPress = "";
		that_V1.MSLAPress = "";
		that_V1.OCPress = "";
		that_V1.MSLACPress = "";
		that_V1.RVPress = "";
		that_V1.CASEMPress = "";
		// -----------------------
		that_V1.EPOD_GRNPress = "";

	},

	setRowCount: function(Tab, height) {
		var busyDialog2 = new sap.m.BusyDialog();
		busyDialog2.open();
		// if (Tab.getRows()[0].getDomRef() !== null) {
		// 	var footerHeight = window.innerHeight - that_V1.getView().byId("FooterToolBar").getDomRef().getBoundingClientRect().top;
		// 	var tablePositionTop = Tab.getRows()[0].getDomRef().getBoundingClientRect().top;
		// 	var TabHeight = window.innerHeight - footerHeight - tablePositionTop;

		// 	var RowCount = parseInt(TabHeight / 57.6);

		// 	Tab.setVisibleRowCount(RowCount);
		// }
		busyDialog2.close();
	},
	bindJCTable: function(DealerKey) {
		var busyDialog1 = new sap.m.BusyDialog();
		busyDialog1.open();
		that_V1.oDataModel2 = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZSER_M07_Q0001_V12_SRV", true);
		var Url = "/ZSER_M07_Q0001_V12(ZPLANTVAR1='" + DealerKey + "')/Results";
		var Table = that_V1.byId("uiTab1");
		var tabfield = "ZDBMORDER";
		var rtabfield = "Jcno";
		that_V1.bindGenericTable(that_V1.oDataModel2, Url, Table, tabfield, rtabfield, that_V1.openJCData);
		busyDialog1.close();
	},

	bindSLATable: function(DealerKey, dateval) {
		var busyDialog1 = new sap.m.BusyDialog();
		busyDialog1.open();
		var oDataModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZSER_M39_Q0001_V14_SRV", true);
		var Url = "/ZSER_M39_Q0001_V14(ZPLANTVAR1='" + DealerKey + "',ZCAL_MONTH1='" + dateval + "')/Results";
		var Table = that_V1.byId("uiTab2");
		var tabfield = "ZDBMORDER";
		var rtabfield = "Jcno";
		that_V1.bindGenericTable(oDataModel, Url, Table, tabfield, rtabfield, that_V1.MSLAData);
		busyDialog1.close();
	},

	bindOpenEOSTable: function(DealerKey) {
		var busyDialog1 = new sap.m.BusyDialog();
		busyDialog1.open();
		var oDataModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZSER_M39_Q0001_V10_SRV", true);
		var Url = "/ZSER_M39_Q0001_V10(ZPLANTVAR1='" + DealerKey + "')/Results";
		var Table = that_V1.byId("uiTab3");
		var tabfield = "ZTICKET";
		var rtabfield = "EosTicketNo";
		that_V1.bindGenericTable(oDataModel, Url, Table, tabfield, rtabfield, that_V1.openEOSData);
		busyDialog1.close();
	},

	bindRMSLATable: function(DealerKey, dateval) {
		var busyDialog1 = new sap.m.BusyDialog();
		busyDialog1.open();
		var oDataModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZSER_M39_Q0001_V11_SRV", true);
		var Url = "/ZSER_M39_Q0001_V11(ZPLANTVAR1='" + DealerKey + "',ZCAL_MONTH1='" + dateval + "')/Results";
		var Table = that_V1.byId("uiTab4");
		var tabfield = "ZTICKET";
		var rtabfield = "EosTicketNo";
		that_V1.bindGenericTable(oDataModel, Url, Table, tabfield, rtabfield, that_V1.RMSLAData);
		busyDialog1.close();
	},
	bindRSMSLATable: function(DealerKey, dateval) {
		var busyDialog1 = new sap.m.BusyDialog();
		busyDialog1.open();
		var oDataModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZSER_M39_Q0001_V12_SRV", true);
		var Url = "/ZSER_M39_Q0001_V12(ZPLANTVAR1='" + DealerKey + "',ZCAL_MONTH1='" + dateval + "')/Results";
		var Table = that_V1.byId("uiTab5");
		var tabfield = "ZTICKET";
		var rtabfield = "EosTicketNo";
		that_V1.bindGenericTable(oDataModel, Url, Table, tabfield, rtabfield, that_V1.RSMSLAData);
		busyDialog1.close();

	},
	//bind Open Complaints Table
	bindOCTable: function(DealerKey, dateval) {
		var busyDialog1 = new sap.m.BusyDialog();
		busyDialog1.open();
		var oDataModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZSER_M39_Q0012_SRV", true);
		var Url = "/ZSER_M39_Q0012(ZPLANTVAR1='" + DealerKey + "')/Results";
		var Table = that_V1.byId("uiTab6");
		var tabfield = "A0CRM_OBJ_ID"; // Complaint No.
		var rtabfield = "ComplaintNo";
		that_V1.bindGenericTable(oDataModel, Url, Table, tabfield, rtabfield, that_V1.OCData);
		busyDialog1.close();
	},

	//bind Missed SLA Complaints Table
	bindMSLACTable: function(DealerKey, dateval) {
		var busyDialog1 = new sap.m.BusyDialog();
		busyDialog1.open();
		var oDataModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZSER_M39_Q0014_SRV", true);
		var Url = "/ZSER_M39_Q0014(ZPLANTVAR1='" + DealerKey + "',ZCAL_MONTH1='" + dateval + "')/Results";
		var Table = that_V1.byId("uiTab7");
		var tabfield = "A0CRM_OBJ_ID";
		var rtabfield = "ComplaintNo";
		that_V1.bindGenericTable(oDataModel, Url, Table, tabfield, rtabfield, that_V1.MSLACData);
		busyDialog1.close();

	},
	// bind Case Management Table
	bindCASEMTable: function(DealerKey, dateval) {
		var busyDialog1 = new sap.m.BusyDialog();
		busyDialog1.open();
		var oDataModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZSER_M70_Q0003_SRV", true);
		var Url = "/ZSER_M70_Q0003(ZPLANTVAR1='" + DealerKey + "',ZCAL_MONTH1='" + dateval + "')/Results";
		var Table = that_V1.byId("uiTab8");
		var tabfield = "ZCASE_ID";
		var rtabfield = "CaseId";
		that_V1.bindGenericTable(oDataModel, Url, Table, tabfield, rtabfield, that_V1.CASEMData);
		busyDialog1.close();
	},
	// Bind PI Table
	bindPITable: function() {
		var busyDialog1 = new sap.m.BusyDialog();
		busyDialog1.open();
		var DealerKey = that_V1.byId(xmlfragment"dealerCombo").getSelectedKey();
		var oDataModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZSER_M95_Q0001_SRV", true);
		var Url = "/ZSER_M95_Q0001(ZPLANTVAR1='" + DealerKey + "')/Results";
		var Table = that_V1.byId("uiTab9");
		var tabfield = "";
		var rtabfield = "";
		that_V1.bindGenericTable(oDataModel, Url, Table, tabfield, rtabfield, that_V1.PIADHData);
		busyDialog1.close();
	},
	// ----------------------------------------
	// avn bind_EPOD_GRN_Table
	bind_EPOD_GRN_Table: function(DealerKey) {
		// var busyDialog1 = new sap.m.BusyDialog();
		// busyDialog1.open();
		if (!this._dialog) {
			this._dialog = sap.ui.xmlfragment("DailHuddleMeeting.view.fragments.BusyDialog", this);
			this.getView().addDependent(this._dialog);
		}

		// open dialog
		jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._dialog);
		this._dialog.open();

		_timeout = jQuery.sap.delayedCall(5000, this, function() {
			this._dialog.close();
		});
		var oDataModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZSER_IS03_Q0001_SRV", true);
		var Url = "/ZSER_IS03_Q0001(ZPLANTVAR1='" + DealerKey + "')/Results";
		var Table = that_V1.byId("idEpod_Grn_Table");
		var tabfield = "";
		var rtabfield = "";
		that_V1.bindGenericTable(oDataModel, Url, Table, tabfield, rtabfield, that_V1.EPODGRN_T_DATA);
		// busyDialog1.close();
	},
	// avn bind_SumryEPOD_GRN_Table
	bind_Sumry_EPOD_GRN_Table: function(DealerKey) {
		// var busyDialog1 = new sap.m.BusyDialog();
		// busyDialog1.open();
		if (!this._dialog) {
			this._dialog = sap.ui.xmlfragment("DailHuddleMeeting.view.fragments.BusyDialog", this);
			this.getView().addDependent(this._dialog);
		}

		// open dialog
		jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._dialog);
		this._dialog.open();

		_timeout = jQuery.sap.delayedCall(5000, this, function() {
			this._dialog.close();
		});

		var oDataModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZSER_IS03_Q0002_SRV", true);
		var Url = "/ZSER_IS03_Q0002(ZPLANTVAR1='" + DealerKey + "')/Results";
		var Table = that_V1.byId("idSumryEpod_Grn_Table");
		var tabfield = "";
		var rtabfield = "";
		that_V1.bindGenericTable(oDataModel, Url, Table, tabfield, rtabfield, that_V1.EPODGRN_Sumry_T_DATA);

	},

	// --------------------------------------------
	//bind RV Table
	bindRVTable: function(DealerKey, dateval) {
		var busyDialog1 = new sap.m.BusyDialog();
		busyDialog1.open();
		var oDataModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZSER_M39_Q0013_SRV", true);
		var Url = "/ZSER_M39_Q0013(ZPLANTVAR1='" + DealerKey + "',ZCAL_MONTH1='" + dateval + "')/Results";
		var Table = that_V1.byId("uiTab12");
		var tabfield = "ZDBMORDER";
		var rtabfield = "CurrentJc";
		that_V1.bindGenericTable(oDataModel, Url, Table, tabfield, rtabfield, that_V1.RVData);
		busyDialog1.close();
	},
	//generic code for all tables binding.
	bindGenericTable: function(Model, Url, Table, tabfield, rtabfield, readData) {
		var json = new sap.ui.model.json.JSONModel({
			results: []
		});
		//var json=new sap.ui.model.json.JSONModel({results:that_V1.GData});
		Table.setModel(json);
		var busyDialog = new sap.m.BusyDialog();
		busyDialog.open();
		//that_V1.busyDialog.open();
		//that_V1._dialog.open();
		Model.read(Url, {
			async: false,
			success: function(oData, oResp) {
				busyDialog.close();
				//that_V1._dialog.close();
				var json = new sap.ui.model.json.JSONModel(oData);
				//var json=new sap.ui.model.json.JSONModel({results:that_V1.GData});
				json.setSizeLimit(oData.results.length);
				if (oResp.requestUri.indexOf("ZSER_M95_Q0001") > -1) {
					for (var i = 0; i < oData.results.length; i++) {
						oData.results[i].Remarks = "";
						oData.results[i].NonAdherencePIReasonKey = "";
						oData.results[i].NonAdhStockAdjReasonKe = "";
						oData.results[i].StockAdjustmentDone = "";
					}
				} else {
					Table.clearSelection();
					for (var i = 0; i < oData.results.length; i++) {
						oData.results[i].enblCombo = false;
						oData.results[i].enblremarks = false;
						oData.results[i].selected = true;

						oData.results[i].Remarks = "";
						oData.results[i].ReasonForGap = "";
						oData.results[i].ReasonForGapText = "";
						oData.results[i].enbleQOC = false;
						oData.results[i].QocDeviation = "";
						oData.results[i].HuddleDate = null;

					}
				}
	

				Table.setModel(json);
				that_V1.setRowCount(Table);
				if (Table.sId.indexOf("uiTab2") > -1 || Table.sId.indexOf("uiTab4") > -1 || Table.sId.indexOf("uiTab5") > -1 || Table.sId.indexOf(
						"uiTab7") > -1 || Table.sId.indexOf("uiTab12") > -1) {
					//that_V1.setColorCode(Table);
					var closuredate;
					if (Table.sId.indexOf("uiTab4") > -1 || Table.sId.indexOf("uiTab5") > -1) {
						closuredate = "ZCLOSE_DT";
					} else {
						closuredate = "A0CALDAY";
					}
					var oSorter = [new sap.ui.model.Sorter("HuddleDate", true), new sap.ui.model.Sorter(closuredate, true)];

					Table.getBinding('rows').sort(oSorter);
				}
				Table.addEventDelegate({
					onAfterRendering: function() {
						that_V1.setRowCount(Table);
						if (Table.sId.indexOf("uiTab2") > -1 || Table.sId.indexOf("uiTab4") > -1 || Table.sId.indexOf("uiTab5") > -1 || Table.sId.indexOf(
								"uiTab7") > -1 || Table.sId.indexOf("uiTab12") > -1) {
							//that_V1.setColorCode(Table);
							var closuredate;
							if (Table.sId.indexOf("uiTab4") > -1 || Table.sId.indexOf("uiTab5") > -1) {
								closuredate = "ZCLOSE_DT";
							} else {
								closuredate = "A0CALDAY";
							}
							var oSorter = [new sap.ui.model.Sorter("HuddleDate", true), new sap.ui.model.Sorter(closuredate, true)];
							Table.getBinding('rows').sort(oSorter);
						}

					}
				});
			},
			error: function(oErr) {
				busyDialog.close();
				//that_V1._dialog.close();
				if (oErr.request.requestUri.indexOf("ZSER_M95_Q0001") > -1) {
					var obj = {
						A9E2ON4CECPV9VXBJCXWXRI39K_F: "",
						A9E2ON4CECPV9VXBJCXWXYKOP4_F: "",
						NonAdherencePIReasonKey: "",
						NonAdherencePIReasonTxt: "",
						NonAdhStockAdjReasonKe: "",
						NonAdhStockAdjReasonTxt: "",
						StockAdjustmentDone: "",
						Remarks: ""
					};
					var json = new sap.ui.model.json.JSONModel({
						"results": [obj]
					});
					that_V1.byId("uiTab9").setModel(json);
				}
				var message = JSON.parse(oErr.response.body).error.message.value;
				sap.m.MessageBox.show(message, {
					title: "Message",
					styleClass: "sapUiSizeCompact",
					icon: sap.m.MessageBox.Icon.ERROR,
					actions: [sap.m.MessageBox.Action.OK],
					onClose: function(oAction) {

					}
				});

			}

		});
	},
	onpressPIReport: function() {
		var delkey = that_V1.byId("dealerCombo").getSelectedKey();
		var date = that_V1.DateFunc();
		window.sessionStorage.dealer = delkey;
		window.sessionStorage.date = date;
		var url = window.location.protocol + "//" + window.location.host + "/sap/bc/ui5_ui5/sap/Zdet_report/index.html";
		sap.m.URLHelper.redirect(url, true);

	},
	onOKReport: function() {
		that_V1.PIReport.close();
	},
	setColorCode: function(Table) {

		Table.setRowSettingsTemplate(new RowSettings({
			highlight: "{status}"
		}));
		for (var i = 0; i < rows.length; i++) {
			debugger;
			if (rows[i].getBindingContext() !== undefined) {
				var index = parseInt(rows[i].getBindingContext().getPath().split("/results/")[1]);
				var data = Table.getModel().getData();

				if (data.results[index].HuddleDate !== null) {
	
					data.results[index].Status = "Information";
					Table.setRowSettingsTemplate(new sap.ui.table.RowSettings({
						highlight: "{status}"
					}));
				}
			}

		}
	},

	// Bind JC KPI
	bindJCKPI: function(DealerKey) {

		that_V1.oDataModel3 = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZSER_M07_Q0001_V11_SRV", true);
		var Url = "/ZSER_M07_Q0001_V11(ZPLANTVAR1='" + DealerKey + "')/Results";
		that_V1.bindGenericKPI(that_V1.oDataModel3, Url);

	},
	// Bind SLA KPI.
	bindSLAKPI: function(DealerKey, dateval) {
		var oDataModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZSER_M39_Q0001_V13_SRV", true);
		var Url = "/ZSER_M39_Q0001_V13(ZCAL_MONTH1='" + dateval + "',ZPLANTVAR1='" + DealerKey + "')/Results";
		that_V1.bindGenericKPI(oDataModel, Url);

	},
	// Bind SLA KPI (Workshop Responsive).
	bindSLAKPIWS: function(DealerKey, dateval) {
		var oDataModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZSER_M17_Q0001_V8_SRV", true);
		var Url = "/ZSER_M17_Q0001_V8(ZCAL_MONTH1='" + dateval + "',ZPLANTVAR1='" + DealerKey + "')/Results";
		that_V1.bindGenericKPI(oDataModel, Url);

	},
	// Bind Revisit KPI.
	bindRVKPI: function(DealerKey, dateval) {

		var oDataModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZSER_M39_Q0001_V15_SRV", true);
		var Url = "/ZSER_M39_Q0001_V15(ZCAL_MONTH1='" + dateval + "',ZPLANTVAR1='" + DealerKey + "')/Results";
		that_V1.bindGenericKPI(oDataModel, Url);

	},
	// Bind bind_KPI_EPOD_GRN_KPI KPI.
	// avnbindKPI
	bind_KPI_EPOD_GRN_KPI: function(DealerKey) {
		if (!this._dialog) {
			this._dialog = sap.ui.xmlfragment("DailHuddleMeeting.view.fragments.BusyDialog", this);
			this.getView().addDependent(this._dialog);
		}

		// open dialog
		jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._dialog);
		this._dialog.open();

		_timeout = jQuery.sap.delayedCall(5000, this, function() {
			this._dialog.close();
		});
		var oDataModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZSER_IS03_Q0001_SRV", true);
		var Url = "/ZSER_IS03_Q0001(ZPLANTVAR1='" + DealerKey + "')/Results";
		that_V1.bindGenericKPI(oDataModel, Url);
	},
	// EPOD Summary
	bind_Sumry_KPI_EPOD_GRN_KPI: function(DealerKey) {
		if (!this._dialog) {
			this._dialog = sap.ui.xmlfragment("DailHuddleMeeting.view.fragments.BusyDialog", this);
			this.getView().addDependent(this._dialog);
		}

		// open dialog
		jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._dialog);
		this._dialog.open();

		_timeout = jQuery.sap.delayedCall(5000, this, function() {
			this._dialog.close();
		});
		var oDataModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZSER_IS03_Q0002_SRV", true);
		var Url = "/ZSER_IS03_Q0002(ZPLANTVAR1='" + DealerKey + "')/Results";
		that_V1.bindGenericKPI(oDataModel, Url);
	},

	// Bind Reach and resolution missed SLA KPI. 
	bindRRKPI: function(DealerKey, dateval) {
		var oDataModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZSER_M39_Q0001_V16_SRV", true);
		var Url = "/ZSER_M39_Q0001_V16(ZCAL_MONTH1='" + dateval + "',ZPLANTVAR1='" + DealerKey + "')/Results";
		that_V1.bindGenericKPI(oDataModel, Url);

	},

	bindCRMCKPI: function(DealerKey, dateval) {
		var oDataModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZSER_M39_Q0017_SRV", true);
		var Url = "/ZSER_M39_Q0017(ZCAL_MONTH1='" + dateval + "',ZPLANTVAR1='" + DealerKey + "')/Results";
		that_V1.bindGenericKPI(oDataModel, Url);

	},
	// Generic Code to bind KPI
	bindGenericKPI: function(Model, Url) {
		//that_V1.busyDialog.open();
		var busyDialog = new sap.m.BusyDialog();
		busyDialog.open();
		Model.read(Url, {
			async: false,
			success: function(oData, oResp) {
				//that_V1.busyDialog.close(); 

				if (oResp.requestUri.indexOf("ZSER_M07_Q0001_V11") > -1) {
					if (oData.results.length > 0) {
						that_V1.byId("repaire_inpId").setText(oData.results[0].A9E2ON4CECPV9VU0KVR1KC0T93_F);
						that_V1.byId("Accd_inpId").setText(oData.results[0].A9E2ON4CECPV9VU0KVR1KK7SIF_F);
						that_V1.byId("BSVI_inpId2").setText(oData.results[0].A9E2ON4CECPV9VU0KVR1KRJ5ZR_F);
					} else {
						that_V1.byId("repaire_inpId").setText();
						that_V1.byId("Accd_inpId").setText();
						that_V1.byId("BSVI_inpId2").setText();
					}

				} else if (oResp.requestUri.indexOf("ZSER_M39_Q0001_V13") > -1) {
					if (oData.results.length > 0) {
						that_V1.byId("MISLAC_inpId1").setText(oData.results[0].A9E2ON4CECPV9VU0LPBBSVUDQG_F);
						that_V1.byId("MISLAC_inpId2").setText(oData.results[0].A9E2ON4CECPV9VU0LPBBT37IFC_F);
						that_V1.byId("MISLAC_inpId3").setText(oData.results[0].A9E2ON4CECPV9VV52P2ARYI6MG_F);
					} else {

						that_V1.byId("MISLAC_inpId1").setText();
						that_V1.byId("MISLAC_inpId2").setText();
						that_V1.byId("MISLAC_inpId3").setText();

					}
				} else if (oResp.requestUri.indexOf("ZSER_M17_Q0001_V8") > -1) {
					if (oData.results.length > 0) {

						that_V1.byId("WSRS_inpId2").setText(oData.results[0].A9E2ON4CECPV9VUHZL9KOQXQTK_F);
					} else {
						that_V1.byId("WSRS_inpId2").setText();
					}
				} else if (oResp.requestUri.indexOf("ZSER_M39_Q0001_V15") > -1) {
					if (oData.results.length > 0) {

						that_V1.byId("RV_inpId1").setText(oData.results[0].A9E2ON4CECPV9VU228V98WQYA0_F);
						that_V1.byId("TAPPJC_inpId2").setText(oData.results[0].A9E2ON4CECPV9VU228V9940KJS_F);
						that_V1.byId("PerPV_inpId3").setText(oData.results[0].A9E2ON4CECPV9VU228V98OP8NC_F);
					} else {
						that_V1.byId("RV_inpId1").setText();
						that_V1.byId("TAPPJC_inpId2").setText();
						that_V1.byId("PerPV_inpId3").setText();
					}
				} else if (oResp.requestUri.indexOf("ZSER_M39_Q0001_V16") > -1) {
					if (oData.results.length > 0) {

						that_V1.byId("OEOS_inpId").setText(oData.results[0].A9E2ON4CECPV9VU269K1V3RB48_F);
						that_V1.byId("RMSLA_inpId1").setText(oData.results[0].A9E2ON4CECPV9VU25TIG38KS94_F);
						that_V1.byId("RMSLA_inpId2").setText(oData.results[0].A9E2ON4CECPV9VU25TIG3H9BM0_F);
						that_V1.byId("RMSLA_inpId3").setText(oData.results[0].A9E2ON4CECPV9VU22Z1SQR9AFV_F);
						that_V1.byId("RMSLA_inpId4").setText(oData.results[0].A9E2ON4CECPV9VU22Z1SQYFEAJ_F);

						that_V1.byId("RMD_inpId3").setText(oData.results[0].A9E2ON4CECPV9VU25TIG3OIXVS_F);
						that_V1.byId("RMD_inpId4").setText(oData.results[0].A9E2ON4CECPV9VU25TIG3VSK5K_F);
						that_V1.byId("RMD_inpId5").setText(oData.results[0].A9E2ON4CECPV9VU22Z1SQD2CD7_F);
						//that_V1.byId("RMD_inpId6").setText(oData.results[0].A9E2ON4CECPV9VU269K1VZPDL4_F);
						that_V1.byId("RMD_inpId7").setText(oData.results[0].A9E2ON4CECPV9VU22Z1SQ5XZQ3_F);
					} else {
						that_V1.byId("OEOS_inpId").setText();
						that_V1.byId("RMSLA_inpId1").setText();
						that_V1.byId("RMSLA_inpId2").setText();
						that_V1.byId("RMSLA_inpId3").setText();
						that_V1.byId("RMSLA_inpId4").setText();

						that_V1.byId("RMD_inpId3").setText();
						that_V1.byId("RMD_inpId4").setText();
						that_V1.byId("RMD_inpId5").setText();
						//that_V1.byId("RMD_inpId6").setText(oData.results[0].A9E2ON4CECPV9VU269K1VZPDL4_F);
						that_V1.byId("RMD_inpId7").setText();
					}
				}
				// ---------------------------------------------------

				// ---------------------------------------------------
				else if (oResp.requestUri.indexOf("ZSER_M39_Q0017") > -1) {
					if (oData.results.length > 0) {
						//that_V1.byId("OC_inpId").setText(oData.results[0].A9E2ON4CECPV9VU269K1V3RB48_F);
						that_V1.byId("OC_inpId").setText(oData.results[0].A9E2ON4CECPV9VU423JRNX0GEG_F);
						that_V1.byId("CC_inpId").setText(oData.results[0].A9E2ON4CECPV9VU41FELYXK8BW_F);
						that_V1.byId("MSLAC_inpId2").setText(oData.results[0].A9E2ON4CECPV9VU41FELZ5Y8FG_F);
						that_V1.byId("MSLAC_inpId3").setText(oData.results[0].A9E2ON4CECPV9VU41FELZDK564_F);
					} else {
						that_V1.byId("OC_inpId").setText();
						that_V1.byId("CC_inpId").setText();
						that_V1.byId("MSLAC_inpId2").setText();
						that_V1.byId("MSLAC_inpId3").setText();
					}

				} else if (oResp.requestUri.indexOf("ZSER_M95_Q0002") > -1) {
					if (oData.results.length > 0) {
						//that_V1.byId("OC_inpId").setText(oData.results[0].A9E2ON4CECPV9VU269K1V3RB48_F);
						that_V1.byId("totparline").setText(oData.results[0].A9E2ON4CECPV9VXBNB28P3VFBK_F);
						that_V1.byId("actstk").setText(oData.results[0].A9E2ON4CECPV9VXBNB28PAY0R4_F);
						// that_V1.byId("stkadjsys").setText(oData.results[0].A9E2ON4CECPV9VXBNY4ASCTP25_F);
						that_V1.byId("stkadjact").setText(oData.results[0].A9E2ON4CECPV9VXBNY4ASJWAHP_F);

						that_V1.byId("idNagVar").setText(oData.results[0].A9E2ON4CECPV9W0GV240170CQP_F);
						that_V1.byId("idNagVarLines").setText(oData.results[0].A9E2ON4CECPV9W0GV2401SPP4X_F);
						that_V1.byId("idPosVar").setText(oData.results[0].A9E2ON4CECPV9W0GV2401IBPFL_F);
						that_V1.byId("idPosVarLine").setText(oData.results[0].A9E2ON4CECPV9W0GV6DUCMWIFZ_F);
					} else {
						that_V1.byId("totparline").setText();
						that_V1.byId("actstk").setText();
						// that_V1.byId("stkadjsys").setText();
						that_V1.byId("stkadjact").setText();

						that_V1.byId("idNagVar").setText();
						that_V1.byId("idNagVarLines").setText();
						that_V1.byId("idPosVar").setText();
						that_V1.byId("idPosVarLine").setText();
					}

				}

				busyDialog.close();
			},
			error: function(oErr) {
				busyDialog.close();
				if (oErr.request.requestUri.indexOf("ZSER_M07_Q0001_V11") > -1) {

					that_V1.byId("repaire_inpId").setText();
					that_V1.byId("Accd_inpId").setText();
					that_V1.byId("BSVI_inpId2").setText();

				} else if (oErr.request.requestUri.indexOf("ZSER_M39_Q0001_V13") > -1) {

					that_V1.byId("MISLAC_inpId1").setText();
					that_V1.byId("MISLAC_inpId2").setText();
					that_V1.byId("MISLAC_inpId3").setText();

				} else if (oErr.request.requestUri.indexOf("ZSER_M17_Q0001_V8") > -1) {

					that_V1.byId("WSRS_inpId2").setText();

				} else if (oErr.request.requestUri.indexOf("ZSER_M39_Q0001_V15") > -1) {

					that_V1.byId("RV_inpId1").setText();
					that_V1.byId("TAPPJC_inpId2").setText();
					that_V1.byId("PerPV_inpId3").setText();

				} else if (oErr.request.requestUri.indexOf("ZSER_M39_Q0001_V16") > -1) {

					that_V1.byId("OEOS_inpId").setText();
					that_V1.byId("RMSLA_inpId1").setText();
					that_V1.byId("RMSLA_inpId2").setText();
					that_V1.byId("RMSLA_inpId3").setText();
					that_V1.byId("RMSLA_inpId4").setText();

					that_V1.byId("RMD_inpId3").setText();
					that_V1.byId("RMD_inpId4").setText();
					that_V1.byId("RMD_inpId5").setText();
					//that_V1.byId("RMD_inpId6").setText(oData.results[0].A9E2ON4CECPV9VU269K1VZPDL4_F);
					that_V1.byId("RMD_inpId7").setText();

				} else if (oErr.request.requestUri.indexOf("ZSER_M39_Q0017") > -1) {

					that_V1.byId("OC_inpId").setText();
					that_V1.byId("CC_inpId").setText();
					that_V1.byId("MSLAC_inpId2").setText();
					that_V1.byId("MSLAC_inpId3").setText();

				} else if (oErr.request.requestUri.indexOf("ZSER_M95_Q0002") > -1) {

					that_V1.byId("totparline").setText();
					that_V1.byId("actstk").setText();
					// that_V1.byId("stkadjsys").setText();
					that_V1.byId("stkadjact").setText();

					that_V1.byId("idNagVar").setText();
					that_V1.byId("idNagVarLines").setText();
					that_V1.byId("idPosVar").setText();
					that_V1.byId("idPosVarLine").setText();

				}
				var message = JSON.parse(oErr.response.body).error.message.value;
				sap.m.MessageBox.show(message, {
					title: "Message",
					styleClass: "sapUiSizeCompact",
					icon: sap.m.MessageBox.Icon.ERROR,
					actions: [sap.m.MessageBox.Action.OK],
					onClose: function(oAction) {

					}
				});
			}

		});
	},

	// Header table multi-Select function 
	HdrSelectionChng: function(Evt) {
		if (Evt.getParameters().rowIndex === -1) {
			return;
		}
		var data = Evt.getSource().getModel().getData();
		if (Evt.getParameter('selectAll')) {
			for (var i = 0; i < data.results.length; i++) {
				data.results[i].enblCombo = true;
				data.results[i].enblremarks = true;
				data.results[i].enbleQOC = true;
				Evt.getSource().getModel().setData(data);
				data.results[i].selected = false;
				data.results[i].selected = false;
			}
		} else {
			if (Evt.getParameter('rowIndices').length === data.results.length) {

				if (data.results[Evt.getParameter('rowContext').getPath().split("/results/")[1]].selected) {
					that_V1.byId(Evt.getSource().sId).selectAll(true);
					for (var i = 0; i < data.results.length; i++) {
						data.results[i].enblCombo = true;
						data.results[i].enblremarks = true;
						data.results[i].enbleQOC = true;
						Evt.getSource().getModel().setData(data);

					}
					data.results[Evt.getParameter('rowContext').getPath().split("/results/")[1]].selected = false;
				} else {
					for (var i = 0; i < data.results.length; i++) {
						data.results[i].enblCombo = false;
						data.results[i].enblremarks = false;
						data.results[i].enbleQOC = false;
						Evt.getSource().getModel().setData(data);

					}
					data.results[Evt.getParameter('rowContext').getPath().split("/results/")[1]].selected = true;
				}

			} else {
				if (data.results[Evt.getParameter('rowContext').getPath().split("/results/")[1]].selected) {
					data.results[Evt.getParameter('rowContext').getPath().split("/results/")[1]].enblCombo = true;
					data.results[Evt.getParameter('rowContext').getPath().split("/results/")[1]].enblremarks = true;
					data.results[Evt.getParameter('rowContext').getPath().split("/results/")[1]].enbleQOC = true;
					Evt.getSource().getModel().setData(data);
					data.results[Evt.getParameter('rowContext').getPath().split("/results/")[1]].selected = false;
				} else {

					data.results[Evt.getParameter('rowContext').getPath().split("/results/")[1]].enblCombo = false;
					data.results[Evt.getParameter('rowContext').getPath().split("/results/")[1]].enblremarks = false;
					data.results[Evt.getParameters().rowIndex].enbleQOC = false;
					Evt.getSource().getModel().setData(data);
					data.results[Evt.getParameter('rowContext').getPath().split("/results/")[1]].selected = true;
				}
			}

		}
	},
	// avn multi select
	check: null,
	epodSelectionChng: function(Evt) {
		if (Evt.getParameters().rowIndex === -1) {
			return;
		}
		var data = Evt.getSource().getModel().getData();
		if (Evt.getParameter('selectAll')) {
			for (var i = 0; i < data.results.length; i++) {
				data.results[i].enblCombo = true;
				data.results[i].enblremarks = true;
				data.results[i].enbleQOC = true;
				Evt.getSource().getModel().setData(data);
				data.results[i].selected = false;
				data.results[i].selected = false;
			}
		} else {
			if (Evt.getParameter('rowIndices').length === data.results.length) {

				if (data.results[Evt.getParameter('rowContext').getPath().split("/results/")[1]].selected) {
					that_V1.byId(Evt.getSource().sId).selectAll(true);
					for (var i = 0; i < data.results.length; i++) {
						data.results[i].enblCombo = true;
						data.results[i].enblremarks = true;
						data.results[i].enbleQOC = true;
						Evt.getSource().getModel().setData(data);

					}
					data.results[Evt.getParameter('rowContext').getPath().split("/results/")[1]].selected = false;
				} else {
					for (var i = 0; i < data.results.length; i++) {
						data.results[i].enblCombo = false;
						data.results[i].enblremarks = false;
						data.results[i].enbleQOC = false;
						Evt.getSource().getModel().setData(data);

					}
					data.results[Evt.getParameter('rowContext').getPath().split("/results/")[1]].selected = true;
				}

			} else {
				// if user has selected a row
				if (data.results[Evt.getParameter('rowContext').getPath().split("/results/")[1]].selected) {

					var tableId = that_V1.getView().byId("idEpod_Grn_Table");
					var tabList = tableId.getBinding().oList;
					var tableModel = tableId.getModel();
					var oItems = tableModel.getData();
				
					var rIndex = Evt.getParameters().rowIndex;
					var eSelectedInvNO = Evt.getSource().getBinding().oList[rIndex].ZSER_IS03___F43; // get Inovice No.  from evt   
					var vStart = null;
					var vEnd = null;

					for (var i = 0; i < oItems.results.length; i++) {
						var tSelectedInvNo = tabList[i].ZSER_IS03___F43; // get Inovice No.  from table

						if (tSelectedInvNo === eSelectedInvNO) {
							that_V1.check = true;
							if (vStart === null) {
								vStart = i;
							}
							vEnd = i;
							data.results[i].enblCombo = true;
							data.results[i].enblremarks = true;
							data.results[i].enbleQOC = true;
							Evt.getSource().getModel().setData(data);
							data.results[i].selected = false;

						}

				
					}
					tableId.addSelectionInterval(vStart, vEnd);
				}

				// if user has un-selected a row
				else {
					if (that_V1.check === false) {
						data.results[Evt.getParameter('rowContext').getPath().split("/results/")[1]].enblCombo = false;
						data.results[Evt.getParameter('rowContext').getPath().split("/results/")[1]].enblremarks = false;
						data.results[Evt.getParameters().rowIndex].enbleQOC = false;
						Evt.getSource().getModel().setData(data);
						data.results[Evt.getParameter('rowContext').getPath().split("/results/")[1]].selected = true;
					}
				}
			}
		}
		that_V1.check = false;
	},

	// Create Payload of Revist tab

	_payload_RV: function(data, i, date, subflag) {
		var data1 = {
			CurrentJc: data[i].ZDBMORDER,
			CurrentDealer: that_V1.byId("dealerCombo").getSelectedKey(),
			Month: date,
			PreviousJc: data[i].ZDBMORDR1, // ZGATE_DT4 (+) Modification done by HJC on 15.12
			PreviousDealer: data[i].ZDEALER4,
			Chassis: data[i].ZCHASISN0,
			Model: data[i].ZVEH_MAT__ZMPG,
			CustId: data[i].A0CUSTOMER,
			VehRegNo: data[i].ZCHASISN0__0CARNUMBER,
			QocDeviation: data[i].QocDeviation,
			ReasonForGap: data[i].ReasonForGap,
			ReasonForGapText: data[i].ReasonForGapText,
			StartDate: that_V1.StartDate,
			StartTime: that_V1.StartTime,
			WarrantyFlag: data[i].ZWTY_EFLG,
			TipperFlag: data[i].ZMOD_EFLG,
			RegistrationNo: data[i].ZVEHGUID__0CARNUMBER,
			KmTravelledFromLastVisit: data[i].A9E2ON4CECPV9VVKUVUHD84BOS,
			DaysFromlastVisit: data[i].A9E2ON4CECPV9VVKUVUHEYXU0C,
			Remarks: data[i].Remarks,
			UserId: that_V1.UserID,
			SubmissionFlag: subflag
		};

		var dateFormat1 = sap.ui.core.format.DateFormat.getDateInstance({
			pattern: "yyyy-MM-ddTHH:mm:ss"
		});
		var dateval = dateFormat1.format(new Date());
		data1.HuddleDate = dateval;
		var time = dateval.split("T")[1].split(":");
		data1.HuddleTime = "PT" + time[0] + "H" + time[1] + "M" + time[2] + "S";
		data1.CurrentJcDate = that_V1.CDate(data[i].A0CALDAY);
		data1.PreviousJcDate = that_V1.CDate(data[i].ZGATE_DT4);

		if (data1.HuddleDate === '0000-00-00T00:00:00') {
			delete data1["HuddleDate"];
		}
		if (data1.CurrentJcDate === '0000-00-00T00:00:00') {
			delete data1["CurrentJcDate"];
		}
		if (data1.PreviousJcDate === '0000-00-00T00:00:00') {
			delete data1["PreviousJcDate"];
		}
		if (data1.StartDate === '0000-00-00T00:00:00') {
			delete data1["StartDate"];
		}
		return data1;
	},

	// Create Payload of OPEN JC Tab
	_payload_OJC: function(data, i, date, subflag) {
		var data1 = {
			Jcno: data[i].ZDBMORDER,
			DealerCode: that_V1.byId("dealerCombo").getSelectedKey(),
			JcType: data[i].ZORD_TYP,
			CustId: data[i].A0CUSTOMER,
			CustMobileNo: "000000000000000",
			CustTypeId: data[i].A0CUSTOMER__ZKATR1,
			//CustTypeId : "00",
			VehicleType: data[i].ZVEH_MAT__ZVERTICAL_T,
			Chassis: data[i].ZCHASISN0,
			Model: data[i].ZVEH_MAT__ZMPG,
			EmissionNorms: data[i].ZVEH_MAT__0AU_MODEL,
			DelayReason: data[i].ZDBMORDER__ZDL_RSN2_T,
			VorOrderNo: data[i].ZDOC_NUM,
			UptimeId: data[i].ZDBMORDER__ZCASE_ID,
			UptimeStatus: data[i].ZDBMORDER__ZCASE_TYP,
			JcOpenDays: data[i].A9E2ON4CECPV9VU0L8RQJW1IJF,
			RegistrationNo: data[i].ZVEHGUID__0CARNUMBER,
			T6Done: data[i].ZFLG_T6,
			FloatUsed: data[i].FloatUsed,
			ReasonForGap: data[i].ReasonForGap,
			ReasonForGapText: data[i].ReasonForGapText,
			StartDate: that_V1.StartDate,
			StartTime: that_V1.StartTime,
			Remarks: data[i].Remarks,
			UserId: that_V1.UserID,
			SubmissionFlag: subflag
		};
		var dateFormat1 = sap.ui.core.format.DateFormat.getDateInstance({
			pattern: "yyyy-MM-ddTHH:mm:ss"
		});
		var dateval = dateFormat1.format(new Date());
		data1.HuddleDate = dateval;
		var time = dateval.split("T")[1].split(":");
		data1.HuddleTime = "PT" + time[0] + "H" + time[1] + "M" + time[2] + "S";
		data1.JcOpenDate = that_V1.CDate(data[i].ZGATE_DT0);
		data1.T2Date = that_V1.CDate(data[i].ZCUST_DT2);
		data1.T4Date = that_V1.CDate(data[i].ZGATE_DT4);
		if (data1.T4Date === '0000-00-00T00:00:00') {
			delete data1["T4Date"];
		}
		if (data1.T2Date === '0000-00-00T00:00:00') {
			delete data1["T2Date"];
		}
		if (data1.JcOpenDate === '0000-00-00T00:00:00') {
			delete data1["JcOpenDate"];
		}
		if (data1.HuddleDate === '0000-00-00T00:00:00') {
			delete data1["HuddleDate"];
		}
		if (data1.StartDate === '0000-00-00T00:00:00') {
			delete data1["StartDate"];
		}
		return data1;
	},

	// Create Payload of open jc Missed SLA Tab
	_payload_OJC_MisedSLA: function(data, i, date, subflag) {
		var data1 = {
			Jcno: data[i].ZDBMORDER,
			DealerCode: that_V1.byId("dealerCombo").getSelectedKey(),
	
			CustId: data[i].A0CUSTOMER,
			CustMobileNo: data[i].A0CUSTOMER,
			//CustTypeId : data[i].A0CUSTOMER__ZKATR1,
			VehicleType: data[i].ZVEH_MAT__ZVERTICAL_T,
			Chassis: data[i].ZCHASISN0,
			Model: data[i].ZVEH_MAT__ZMPG,
			EmissionNorms: data[i].ZVEH_MAT__0AU_MODEL,
			DelayReason: data[i].ZDBMORDER__ZDL_RSN2_T,
			SolmanNo: "",
			VorOrderNo: data[i].ZDOC_NUM,
			UptimeId: data[i].ZDBMORDER__ZCASE_ID,
			UptimeStatus: data[i].ZDBMORDER__ZCASE_TYP,
			RegistrationNo: data[i].ZVEHGUID__0CARNUMBER,
	
			Month: date,
	
			T5T0: data[i].A9E2ON4CECPV9VUNRCFWJ3ME5L,
			Frt: data[i].A9E2ON4CECPV9VUNRCFWJBTDEX,
			ReasonForGap: data[i].ReasonForGap,
			ReasonForGapText: data[i].ReasonForGapText,
			Remarks: data[i].Remarks,
			StartDate: that_V1.StartDate,
			StartTime: that_V1.StartTime,
			QocDeviation: data[i].QocDeviation,
			SubmissionFlag: subflag,
			UserId: that_V1.UserID

		};
		var dateFormat1 = sap.ui.core.format.DateFormat.getDateInstance({
			pattern: "yyyy-MM-ddTHH:mm:ss"
		});
		var dateval = dateFormat1.format(new Date());
		data1.HuddleDate = dateval;
		var time = dateval.split("T")[1].split(":");
		data1.HuddleTime = "PT" + time[0] + "H" + time[1] + "M" + time[2] + "S";
		data1.JcOpenDate = that_V1.CDate(data[i].ZGATE_DT0);
		data1.T2Date = that_V1.CDate(data[i].ZCUST_DT2);
		data1.T4Date = that_V1.CDate(data[i].ZGATE_DT4);
		data1.T5Date = that_V1.CDate(data[i].A0CALDAY);
		return data1;
	},

	checkFloat: null,
	_CheckRemarks: null,
	_check_FloatUsage: 0,
	_checkMandatoryFeilds: null,
	_CurrentFeild: null,
	_lastCounter: null,
	// create call for generate and simulate trip
	DeepCreateCall: function(title) {
		if (!this._dialog) {
			this._dialog = sap.ui.xmlfragment("DailHuddleMeeting.view.fragments.BusyDialog", this);
			this.getView().addDependent(this._dialog);
		}

		// open dialog
		jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._dialog);
		this._dialog.open();

		_timeout = jQuery.sap.delayedCall(6000, this, function() {
			this._dialog.close();
		});

		var SelIconTab = that_V1.byId("ITBId").getSelectedKey();

		var btntxt = title.getSource().getText();

		var subflag = btntxt === "Save as Draft" ? "" : "X";
		that_V1.subflag = subflag;
		if (SelIconTab === "OJKey") {

			var ojctab = that_V1.byId("ojctb").getPressed();
			var mslatab = that_V1.byId("mslatb").getPressed();
			var floatUsageTab = that_V1.byId("idFloatUsage").getPressed();
			if (mslatab === true) {

				var OdataModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZAM_SLAJC_HDL_BW_SRV", true);
				//	OdataModel.setUseBatch(true);
				var data = that_V1.byId("uiTab2").getModel().getData().results;
				//var data = that_V1.byId("uiTab1").getModel().getData().results;
				var selarr = data.map(function(e) {
					return e.selected;
				});
				if (selarr.indexOf(false) === -1) {
					sap.m.MessageToast.show("Select Atleast One Record");
					return;
				}

				var date = that_V1.DateFunc();
				if (btntxt === "Save as Draft") {
					for (var i = 0; i < data.length; i++) {

						if (!data[i].selected) {
							var checkRemarks = data[i].Remarks.trim();
							if (checkRemarks !== "") {
								var url = "/ET_am_slajc_hdl_bwSet";
								var data1 = that_V1._payload_OJC_MisedSLA(data, i, date, subflag);

								that_V1.CreateCall(url, data1, OdataModel, subflag);
							} else {
								that_V1._CheckRemarks = data[i].ZDBMORDER;
							}
						}
					}

					if (that_V1._CheckRemarks !== null) {
						sap.m.MessageBox.error("Mandatory field : Remarks in Missed SLA - " + that_V1._CheckRemarks);
						that_V1._CheckRemarks = null;
					}

					if (mslatab === true) {
						var delkey = that_V1.byId("dealerCombo").getSelectedKey();
						var date = that_V1.DateFunc();
						that_V1.bindSLATable(delkey, date);
						that_V1.readMSLA();
					}
				} else {
					that_V1._checkMandatoryFeilds = true;
					for (var i = 0; i < data.length; i++) {
						if (data[i].ReasonForGap == "" || data[i].Remarks.trim() == "") {
							that_V1._CurrentFeild = data[i].ZDBMORDER;
							that_V1._checkMandatoryFeilds = false;
							break;
						}
					}
					if (!that_V1._checkMandatoryFeilds) {
						sap.m.MessageBox.error("Fill All Mandatory fields in Table");
						that_V1._CurrentFeild = null;
					} else {
						// Save Code
						for (var i = 0; i < data.length; i++) {
							var url = "/ET_am_slajc_hdl_bwSet";
							// Payload
							var data1 = that_V1._payload_OJC_MisedSLA(data, i, date, subflag);
							that_V1.CreateCall(url, data1, OdataModel);
						}
						var delkey = that_V1.byId("dealerCombo").getSelectedKey();
						var date = that_V1.DateFunc();
						that_V1.bindSLATable(delkey, date);
						that_V1.readMSLA();
					}
				}

			}
			if (ojctab === true) {
				var OdataModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZAM_OPENJC_HDL_BW_SRV_01", true);
				//OdataModel.setUseBatch(true);
				var data = that_V1.byId("uiTab1").getModel().getData().results;
				var selarr = data.map(function(e) {
					return e.selected;
				});
				if (selarr.indexOf(false) === -1) {
					sap.m.MessageToast.show("Select Atleast One Record");
					return;
				}
				if (btntxt === "Save as Draft") {
					for (var i = 0; i < data.length; i++) {
						if (!data[i].selected) {
							var checkRemarks = data[i].Remarks.trim();
						
							if (checkRemarks !== "") { // For Remarks only
								// that_V1.byId("uiTab1").getRows()[0].getCells()[21].setValueState("None");
								var url = "/ET_AM_OpenJC_HDL_BWSet";
								var data1 = that_V1._payload_OJC(data, i, date, subflag);


								//  Create Call
								that_V1.CreateCall(url, data1, OdataModel, subflag);
							} else {
								that_V1._CheckRemarks = data[i].ZDBMORDER;
								// that_V1.byId("uiTab1").getRows()[i].getCells()[21].setValueState("Error");
							}
					
						}
					}
		
					if (that_V1._CheckRemarks !== null) {
						sap.m.MessageBox.error("Mandatory field : Remarks in JC - " + that_V1._CheckRemarks);
						that_V1._CheckRemarks = null;
					}

					if (ojctab === true) {
						var delkey = that_V1.byId("dealerCombo").getSelectedKey();
						that_V1.bindJCTable(delkey);
						that_V1.readOpenJC();
					}
				} else {
					that_V1._checkMandatoryFeilds = true;
					for (var i = 0; i < data.length; i++) {
						if (data[i].ReasonForGap == "" || data[i].Remarks.trim() == "") {
							that_V1._CurrentFeild = data[i].ZDBMORDER;
							that_V1._checkMandatoryFeilds = false;
							break;
						}
					}
					if (!that_V1._checkMandatoryFeilds) {
						sap.m.MessageBox.error("Fill All Mandatory fields in Table");
						that_V1._CurrentFeild = null;
					} else {
						// Save Code
						for (var i = 0; i < data.length; i++) {
							var url = "/ET_AM_OpenJC_HDL_BWSet";
							// Payload
							var data1 = that_V1._payload_OJC(data, i, date, subflag);
							that_V1.CreateCall(url, data1, OdataModel);
						}
						var delkey = that_V1.byId("dealerCombo").getSelectedKey();
						that_V1.bindJCTable(delkey);
						that_V1.readOpenJC();
					}
				}

			}
			if (floatUsageTab === true) {
				that_V1._check_FloatUsage = 0;
				var data = that_V1.byId("idFloatTable").getModel("oFloatUsageModel").getData();
				var oTableRows = that_V1.byId("idFloatTable").getRows();
				
				for (var i = 0; i < data.length; i++) {
					var oJcNo = data[i].JcNo;
					var oFloatPartNo = data[i].FloatPartNo;
					var oFloatSerialNo = data[i].FloatSerialNo;

					if (oJcNo === "" || oFloatPartNo === "" || oFloatSerialNo === "") {
						oTableRows[i].getCells()[0].setValueState("Error");
						oTableRows[i].getCells()[1].setValueState("Error");
						oTableRows[i].getCells()[2].setValueState("Error");
					}

					if (oJcNo !== "" && oFloatPartNo !== "" && oFloatSerialNo !== "") {
						oTableRows[i].getCells()[0].setValueState("None");
						oTableRows[i].getCells()[1].setValueState("None");
						oTableRows[i].getCells()[2].setValueState("None");
						that_V1._check_FloatUsage = 1;
						var OdataModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZAM_FLOAT_HDL_BW_SRV", true);
						var url = "/ET_AM_FLOAT_HDL_BWSet";
						var data1 = {
							"JcNo": oJcNo,
							"DealerCode": that_V1.byId("dealerCombo").getSelectedKey(),
							"FloatPartNo": oFloatPartNo,
							"FloatSerialNo": oFloatSerialNo,
							"UserId": that_V1.UserID,
							"SubmissionFlag": subflag
						};
						var dateFormat1 = sap.ui.core.format.DateFormat.getDateInstance({
							pattern: "yyyy-MM-ddTHH:mm:ss"
						});
						var dateval = dateFormat1.format(new Date());
						data1.StartDate = dateval;
						var time = dateval.split("T")[1].split(":");
						data1.StartTime = "PT" + time[0] + "H" + time[1] + "M" + time[2] + "S";
						if (data1.StartDate === '0000-00-00T00:00:00') {
							delete data1["StartDate"];
						}
						that_V1.CreateCall(url, data1, OdataModel, subflag);
						// 
					}
				}
				if (that_V1._check_FloatUsage === 0) {
					sap.m.MessageBox.error("Please Fill Feilds");
				}
				//   Here read Method will call
				that_V1._bindFloatUsageTable();

			}

			
		} else if (SelIconTab === "EOSKey") {
			var oeostab = that_V1.byId("oeostb").getPressed();
			var rmslatab = that_V1.byId("remslatb").getPressed();
			var rsmslatab = that_V1.byId("rsmslatb").getPressed();
			if (oeostab === true) {

				var OdataModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZAM_OPENEOS_HDL_BW_SRV", true);
				var data = that_V1.byId("uiTab3").getModel().getData().results;
				var selarr = data.map(function(e) {
					return e.selected;
				});
				if (selarr.indexOf(false) === -1) {
					sap.m.MessageToast.show("Select Atleast One Record");
					return;
				}
				var date = that_V1.DateFunc();
				for (var i = 0; i < data.length; i++) {

					if (!data[i].selected) {
						var checkRemarks = data[i].Remarks.trim();
						if (checkRemarks !== "") {

							var url = "/ET_AM_OpenEOS_HDL_BWSet";
							var data1 = {
								EosTicketNo: data[i].ZTICKET,
								DealerCode: that_V1.byId("dealerCombo").getSelectedKey(),
								// HuddleDate : null,
								//HuddleTime : "PT00H00M00S",
								CustNo: data[i].A0CUSTOMER,
								CustName: data[i].A0CUSTOMER_T,
								//CustTypeId : data[i].A0CUSTOMER__ZKATR1,
								CustTypeId: "00000",
								TicketAssTo: data[i].ZVEHI_TYP,
								VehicleType: data[i].ZVERTICAL,
								// VehicleType : "",
								Chassis: data[i].ZCHASISN0,
								VehRegNo: data[i].ZVEH_REG,
								BreakdownLocation: data[i].ZBRK_LOC,
								EstimatedDist: data[i].ZEOS_VNED,
								// TotalReachTime : data[i].ZRESPONSE,
								ReasonForGap: data[i].ReasonForGap,
								ReasonForGapText: data[i].ReasonForGapText,
								StartDate: that_V1.StartDate,
								StartTime: that_V1.StartTime,
								Remarks: data[i].Remarks,
								SubmissionFlag: subflag,
								UserId: that_V1.UserID
							};

							var dateFormat1 = sap.ui.core.format.DateFormat.getDateInstance({
								pattern: "yyyy-MM-ddTHH:mm:ss"
							});
							var dateval = dateFormat1.format(new Date());
							data1.HuddleDate = dateval;
							var time = dateval.split("T")[1].split(":");
							data1.HuddleTime = "PT" + time[0] + "H" + time[1] + "M" + time[2] + "S";
							// --------------------------------------------------------
							if (data[i].ZCRE_TIME_T === '') {
								var sZcreTime = "000000";
							} else {
								var gtZcreTime = data[i].ZCRE_TIME_T;
								var regex = /:/g;
								var sZcreTime = gtZcreTime.replace(regex, "");
							}
							data1.TicketCrDate = that_V1.CDate(data[i].ZCRE_DATE, sZcreTime);
							data1.TicketCrTime = that_V1.CTime(sZcreTime);
							// ============================================================
							// data1.TicketCrDate = that_V1.CDate(data[i].ZCRE_DATE, data[i].ZCRE_TIME.ms);
							// data1.TicketCrTime = that_V1.CTime(data[i].ZCRE_TIME.ms);
							// ----------------------------------------------------

							if (data[i].ZASSIGNTM_T === '') {
								var sZASSIGNTM = "000000";
							} else {
								var gtZASSIGNTM = data[i].ZASSIGNTM_T;
								var regex = /:/g;
								var sZASSIGNTM = gtZASSIGNTM.replace(regex, "");
							}
							data1.ReassignDate = that_V1.CDate(data[i].ZASSIGNDT, sZASSIGNTM);
							data1.ReassignTime = that_V1.CTime(sZASSIGNTM);
							// ----------------------------------------------------
							if (data[i].ZEOS_VST_T === '') {
								var sZEOS_VST = '000000';
							} else {
								var gtZEOS_VST = data[i].ZEOS_VST_T;
								var regex = /:/g;
								var sZEOS_VST = gtZEOS_VST.replace(regex, "");

							}
							data1.TripStartDate = that_V1.CDate(data[i].ZVAN_STDT, sZEOS_VST);
							data1.TripStartTime = that_V1.CTime(sZEOS_VST);
							// ----------------------------------------------------
							if (data[i].ZVANR_TIM_T === '') {
								var sZVANR_TIM = '000000';
							} else {
								var gtZVANR_TIM = data[i].ZVANR_TIM_T;
								var regex = /:/g;
								var sZVANR_TIM = gtZVANR_TIM.replace(regex, "");
							}
							data1.VanReachDate = that_V1.CDate(data[i].ZVANR_DAT, sZVANR_TIM);
							data1.VanReachTime = that_V1.CTime(sZVANR_TIM);
							// ----------------------------------------------------
							//data1.TotalReachTime = that_V1.CTime(data[i].ZRESPONSE );

							// ----------------------------------------------------
							if (data1.StartDate === '0000-00-00T00:00:00') {
								delete data1["StartDate"];
							}
							if (data1.HuddleDate === '0000-00-00T00:00:00') {
								delete data1["HuddleDate"];
							}
							if (data1.TicketCrDate === '0000-00-00T00:00:00') {
								delete data1["TicketCrDate"];
							}
							if (data1.ReassignDate === '0000-00-00T00:00:00') {
								delete data1["ReassignDate"];
							}
							if (data1.TripStartDate === '0000-00-00T00:00:00') {
								delete data1["TripStartDate"];
							}
							if (data1.VanReachDate === '0000-00-00T00:00:00') {
								delete data1["VanReachDate"];
							}

							that_V1.CreateCall(url, data1, OdataModel, subflag);
						} else {
							that_V1._CheckRemarks = data[i].ZTICKET;
						}
					}

				}
				if (that_V1._CheckRemarks !== null) {
					sap.m.MessageBox.error("Mandatory field : Remarks in Open EOS - " + that_V1._CheckRemarks);
					that_V1._CheckRemarks = null;
				}
				var delkey = that_V1.byId("dealerCombo").getSelectedKey();
				var date = that_V1.DateFunc();
				that_V1.bindOpenEOSTable(delkey);
				that_V1.readOpenEOS();

			} else if (rmslatab === true) {
				var OdataModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZAM_SLAEOS_HDL_BW_SRV", true);
				var data = that_V1.byId("uiTab4").getModel().getData().results;
				//var data = that_V1.byId("uiTab3").getModel().getData().results;
				var selarr = data.map(function(e) {
					return e.selected;
				});
				if (selarr.indexOf(false) === -1) {
					sap.m.MessageToast.show("Select Atleast One Record");
					return;
				}
				var date = that_V1.DateFunc();
				for (var i = 0; i < data.length; i++) {

					if (!data[i].selected) {
						var checkRemarks = data[i].Remarks.trim();
						if (checkRemarks !== "") {

							var url = "/ET_AM_SLAEOS_HDL_BWSet";
							var data1 = {
								EosTicketNo: data[i].ZTICKET,
								DealerCode: that_V1.byId("dealerCombo").getSelectedKey(),
								HuddleDate: null,
								HuddleTime: "PT00H00M00S",
								// Zmonth:date,
								CustNo: data[i].A0CUSTOMER,
								CustName: data[i].A0CUSTOMER_T,
								// CustTypeId : data[i].A0CUSTOMER__ZKATR1,
								CustTypeId: "00000",
								TicketAssTo: data[i].ZVEHI_TYP,
								VehicleType: data[i].ZVERTICAL,
								//VehicleType : "",
								Chassis: data[i].ZCHASISN0,
								VehRegNo: data[i].ZVEH_REG,
								BreakdownLocation: data[i].ZBRK_LOC,
								EstimatedDist: data[i].ZEOS_VNED,
								//  TotalReachTime : data[i].ZRESPONSE,
								StartDate: that_V1.StartDate,
								StartTime: that_V1.StartTime,
								ReasonForGap: data[i].ReasonForGap,
								ReasonForGapText: data[i].ReasonForGapText,
								Remarks: data[i].Remarks,
								QocDeviation: data[i].QocDeviation,
								UserId: that_V1.UserID,
								SubmissionFlag: subflag
							};
							var dateFormat1 = sap.ui.core.format.DateFormat.getDateInstance({
								pattern: "yyyy-MM-ddTHH:mm:ss"
							});
							var dateval = dateFormat1.format(new Date());
							data1.HuddleDate = dateval;
							var time = dateval.split("T")[1].split(":");
							data1.HuddleTime = "PT" + time[0] + "H" + time[1] + "M" + time[2] + "S";
							// -----------------------------------------------------------------

							if (data[i].ZCRE_TIME_T === '') {
								var sZCRE_TIME = '000000';
							} else {
								var gtZCRE_TIME = data[i].ZCRE_TIME_T;
								var regex = /:/g;
								var sZCRE_TIME = gtZCRE_TIME.replace(regex, "");
							}
							data1.TicketCrDate = that_V1.CDate(data[i].ZCRE_DATE, sZCRE_TIME);
							data1.TicketCrTime = that_V1.CTime(sZCRE_TIME);
							// -----------------------------------------------------------------
							if (data[i].ZREASS_TM_T === '') {
								var sZREASS_TM = '000000';
							} else {
								var gtZREASS_TM = data[i].ZREASS_TM_T;
								var regex = /:/g;
								var sZREASS_TM = gtZREASS_TM.replace(regex, "");
							}
							data1.ReassignDate = that_V1.CDate(data[i].ZREASS_DT, sZREASS_TM);
							data1.ReassignTime = that_V1.CTime(sZREASS_TM);
							// -----------------------------------------------------------------
							if (data[i].ZEOS_VST_T === '') {
								var stZEOS_VST = '000000';
							} else {
								var gtZEOS_VST = data[i].ZEOS_VST_T;
								var regex = /:/g;
								var stZEOS_VST = gtZEOS_VST.replace(regex, "");
							}
							data1.TripStartDate = that_V1.CDate(data[i].ZVAN_STDT, stZEOS_VST);
							data1.TripStartTime = that_V1.CTime(stZEOS_VST);
							// -----------------------------------------------------------------
							if (data[i].ZVANR_TIM_T === '') {
								var sttZVANR_TIM = '000000';
							} else {
								var gtZVANR_TIM = data[i].ZVANR_TIM_T;
								var regex = /:/g;
								var sttZVANR_TIM = gtZVANR_TIM.replace(regex, "");
							}
							data1.VanReachDate = that_V1.CDate(data[i].ZVANR_DAT, sttZVANR_TIM);
							data1.VanReachTime = that_V1.CTime(sttZVANR_TIM);
							// ------------------------------------------------------------------
							data1.ClosureDate = that_V1.CDate(data[i].ZCLOSE_DT);
							//data1.TotalReachTime = that_V1.CTime(data[i].ZRESPONSE );

							if (data1.StartDate === '0000-00-00T00:00:00') {
								delete data1["StartDate"];
							}
							if (data1.HuddleDate === '0000-00-00T00:00:00') {
								delete data1["HuddleDate"];
							}
							if (data1.TicketCrDate === '0000-00-00T00:00:00') {
								delete data1["TicketCrDate"];
							}
							if (data1.ReassignDate === '0000-00-00T00:00:00') {
								delete data1["ReassignDate"];
							}
							if (data1.TripStartDate === '0000-00-00T00:00:00') {
								delete data1["TripStartDate"];
							}
							if (data1.VanReachDate === '0000-00-00T00:00:00') {
								delete data1["VanReachDate"];
							}
							if (data1.ClosureDate === '0000-00-00T00:00:00') {
								delete data1["ClosureDate"];
							}

							that_V1.CreateCall(url, data1, OdataModel, subflag);
						} else {
							that_V1._CheckRemarks = data[i].ZTICKET;
						}
					}

				}

				if (that_V1._CheckRemarks !== null) {
					sap.m.MessageBox.error("Mandatory field : Remarks in Reach Missed SLA - " + that_V1._CheckRemarks);
					that_V1._CheckRemarks = null;
				}
				var delkey = that_V1.byId("dealerCombo").getSelectedKey();
				var date = that_V1.DateFunc();

				//that_V1.bindRRKPI(delkey , date);
				that_V1.bindRMSLATable(delkey, date);
				that_V1.readRMSLA();
			} else if (rsmslatab === true) {
				var OdataModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZAM_RES_SLAEOS_H_BW_SRV", true);
				var data = that_V1.byId("uiTab5").getModel().getData().results;
				//var data = that_V1.byId("uiTab3").getModel().getData().results;
				var selarr = data.map(function(e) {
					return e.selected;
				});
				if (selarr.indexOf(false) === -1) {
					sap.m.MessageToast.show("Select Atleast One Record");
					return;
				}
				var date = that_V1.DateFunc();
				for (var i = 0; i < data.length; i++) {

					if (!data[i].selected) {
						var checkRemarks = data[i].Remarks.trim();
						if (checkRemarks !== "") {

							var url = "/ET_AM_RES_SLAEOS_HDL_BWSet";
							var data1 = {
								EosTicketNo: data[i].ZTICKET,
								DealerCode: that_V1.byId("dealerCombo").getSelectedKey(),
								//HuddleDate : null,
								//HuddleTime : "PT00H00M00S",
								Verticle: "",
								//Zmonth:date,
								CustNo: data[i].A0CUSTOMER,
								CustName: data[i].A0CUSTOMER_T,
								// CustTypeId : data[i].A0CUSTOMER__ZKATR1,
								CustTypeId: "00000",
								TicketAssTo: data[i].ZVEHI_TYP,
								VehicleType: data[i].ZVERTICAL,
								//VehicleType : "",
								Chassis: data[i].ZCHASISN0,
								VehRegNo: data[i].ZVEH_REG,
								BreakdownLocation: data[i].ZBRK_LOC,
								EstimatedDist: data[i].ZEOS_VNED,
								// TotalReachTime : data[i].ZRESPONSE,
								ReasonForGap: data[i].ReasonForGap,
								ReasonForGapText: data[i].ReasonForGapText,
								StartDate: that_V1.StartDate,
								StartTime: that_V1.StartTime,
								Remarks: data[i].Remarks,
								QocDeviation: data[i].QocDeviation,
								UserId: that_V1.UserID,
								SubmissionFlag: subflag
							};
							var dateFormat1 = sap.ui.core.format.DateFormat.getDateInstance({
								pattern: "yyyy-MM-ddTHH:mm:ss"
							});
							var dateval = dateFormat1.format(new Date());
							data1.HuddleDate = dateval;
							var time = dateval.split("T")[1].split(":");
							data1.HuddleTime = "PT" + time[0] + "H" + time[1] + "M" + time[2] + "S";
							// -----------------------------------------------------------------
							if (data[i].ZCRE_TIME_T === '') {
								var stZCRE_TIME = '000000';
							} else {
								var gtZCRE_TIME = data[i].ZCRE_TIME_T;
								var regex = /:/g;
								var stZCRE_TIME = gtZCRE_TIME.replace(regex, "");
							}
							data1.TicketCrDate = that_V1.CDate(data[i].ZCRE_DATE, stZCRE_TIME);
							data1.TicketCrTime = that_V1.CTime(stZCRE_TIME);
							// -----------------------------------------------------------------
							if (data[i].ZREASS_TM_T === '') {
								var stZREASS_TM = '000000';
							} else {
								var gZREASS_TM = data[i].ZREASS_TM_T;
								var regex = /:/g;
								var stZREASS_TM = gZREASS_TM.replace(regex, "");
							}
							data1.ReassignDate = that_V1.CDate(data[i].ZREASS_DT, stZREASS_TM);
							data1.ReassignTime = that_V1.CTime(stZREASS_TM);
							// -----------------------------------------------------------------
							if (data[i].ZEOS_VST_T === '') {
								var sttZEOS_VST = '000000';
							} else {
								var gZEOS_VST = data[i].ZEOS_VST_T;
								var regex = /:/g;
								var sttZEOS_VST = gZEOS_VST.replace(regex, "");
							}
							data1.TripStartDate = that_V1.CDate(data[i].ZVAN_STDT, sttZEOS_VST);
							data1.TripStartTime = that_V1.CTime(sttZEOS_VST);
							// -----------------------------------------------------------------
							if (data[i].ZVANR_TIM_T === '') {
								var stZVANR_TIM = '000000';
							} else {
								var gZVANR_TIM = data[i].ZVANR_TIM_T;
								var regex = /:/g;
								var stZVANR_TIM = gZVANR_TIM.replace(regex, "");
							}
							data1.VanReachDate = that_V1.CDate(data[i].ZVANR_DAT, stZVANR_TIM);
							data1.VanReachTime = that_V1.CTime(stZVANR_TIM);
							// --------------------------------------------------------------------
							data1.ClosureDate = that_V1.CDate(data[i].ZCLOSE_DT);
							//data1.TotalReachTime = that_V1.CTime(data[i].ZRESPONSE );

							if (data1.StartDate === '0000-00-00T00:00:00') {
								delete data1["StartDate"];
							}
							if (data1.HuddleDate === '0000-00-00T00:00:00') {
								delete data1["HuddleDate"];
							}
							if (data1.TicketCrDate === '0000-00-00T00:00:00') {
								delete data1["TicketCrDate"];
							}
							if (data1.ReassignDate === '0000-00-00T00:00:00') {
								delete data1["ReassignDate"];
							}
							if (data1.TripStartDate === '0000-00-00T00:00:00') {
								delete data1["TripStartDate"];
							}
							if (data1.VanReachDate === '0000-00-00T00:00:00') {
								delete data1["VanReachDate"];
							}
							if (data1.ClosureDate === '0000-00-00T00:00:00') {
								delete data1["ClosureDate"];
							}

							that_V1.CreateCall(url, data1, OdataModel, subflag);

							//that_V1.CreateCall(url,data1,OdataModel);
						} else {
							that_V1._CheckRemarks = data[i].ZTICKET;
						}
					}

				}

				if (that_V1._CheckRemarks !== null) {
					sap.m.MessageBox.error("Mandatory field : Remarks in Resolution Missed SLA - " + that_V1._CheckRemarks);
					that_V1._CheckRemarks = null;
				}
				var delkey = that_V1.byId("dealerCombo").getSelectedKey();
				var date = that_V1.DateFunc();

				that_V1.bindRSMSLATable(delkey, date);
				that_V1.readRSMSLA();
			}
		} else if (SelIconTab === "CRMCKey") {
			var octab = that_V1.byId("octb").getPressed();
			var mslactab = that_V1.byId("mslactb").getPressed();

			if (octab === true) {
				var OdataModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZAM_OPENCOMPL_HDL_BW_SRV", true);
				var data = that_V1.byId("uiTab6").getModel().getData().results;
				var selarr = data.map(function(e) {
					return e.selected;
				});
				if (selarr.indexOf(false) === -1) {
					sap.m.MessageToast.show("Select Atleast One Record");
					return;
				}
				var date = that_V1.DateFunc();
				for (var i = 0; i < data.length; i++) {

					if (!data[i].selected) {
						var checkRemarks = data[i].Remarks.trim();
						if (checkRemarks !== "") {

							var url = "/ET_AM_OPENCOMPL_HDL_BWSet";

							var data1 = {
								ComplaintNo: data[i].A0CRM_OBJ_ID,
								DealerCode: that_V1.byId("dealerCombo").getSelectedKey(),
								//HuddleDate : null,
								//HuddleTime : "PT00H00M00S",
								ComplaintType: data[i].ZCATEG1,
								ComplaintSource: data[i].A0CRM_ACTCAT,
								CustNo: data[i].A0SOLD_TO,
								CustName: data[i].A0SOLD_TO_T,
								ComplaintSubtype: data[i].ZCATEG2,
								ComplaintStatus: data[i].ZSTAT,
								VehiceType: data[i].A0MATERIAL__ZVERTICAL,
								Chassis: data[i].A0AU_VHVIN,
								Model: data[i].A0MATERIAL__ZMPG,
								OpenForDays: data[i].A9E2ON4CECPV9VTCMQ9YVPF5T8,
								ReasonForGap: data[i].ReasonForGap,
								ReasonForGapText: data[i].ReasonForGapText,
								StartDate: that_V1.StartDate,
								StartTime: that_V1.StartTime,
								Remarks: data[i].Remarks,
								UserId: that_V1.UserID,
								SubmissionFlag: subflag

							};
							var dateFormat1 = sap.ui.core.format.DateFormat.getDateInstance({
								pattern: "yyyy-MM-ddTHH:mm:ss"
							});
							var dateval = dateFormat1.format(new Date());
							data1.HuddleDate = dateval;
							var time = dateval.split("T")[1].split(":");
							data1.HuddleTime = "PT" + time[0] + "H" + time[1] + "M" + time[2] + "S";
							data1.ComaplintCrDate = that_V1.CDate(data[i].A0CRMPOSTDAT);
							data1.ComplaintResDate = that_V1.CDate(data[i].ZRESLV_DT);

							if (data1.StartDate === '0000-00-00T00:00:00') {
								delete data1["StartDate"];
							}
							if (data1.HuddleDate === '0000-00-00T00:00:00') {
								delete data1["HuddleDate"];
							}
							if (data1.ComaplintCrDate === '0000-00-00T00:00:00') {
								delete data1["ComaplintCrDate"];
							}
							if (data1.ComplaintResDate === '0000-00-00T00:00:00') {
								delete data1["ComplaintResDate"];
							}

							that_V1.CreateCall(url, data1, OdataModel);
						} else {
							that_V1._CheckRemarks = data[i].A0CRM_OBJ_ID;
						}
					}

				}

				if (that_V1._CheckRemarks !== null) {
					sap.m.MessageBox.error("Mandatory field : Remarks in Open Complaints - " + that_V1._CheckRemarks);
					that_V1._CheckRemarks = null;
				}
				var delkey = that_V1.byId("dealerCombo").getSelectedKey();
				var date = that_V1.DateFunc();
				that_V1.bindOCTable(delkey, date);
				that_V1.readOC();
			}
			if (mslactab === true) {
				var OdataModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZAM_SLACOMPL_HDL_BW_SRV", true);
				var data = that_V1.byId("uiTab7").getModel().getData().results;
				var selarr = data.map(function(e) {
					return e.selected;
				});
				if (selarr.indexOf(false) === -1) {
					sap.m.MessageToast.show("Select Atleast One Record");
					return;
				}
				var date = that_V1.DateFunc();
				for (var i = 0; i < data.length; i++) {

					if (!data[i].selected) {
						var checkRemarks = data[i].Remarks.trim();
						if (checkRemarks !== "") {

							var url = "/ET_AM_SLACOMPL_HDL_BWSet";

							var data1 = {
								ComplaintNo: data[i].A0CRM_OBJ_ID,
								DealerCode: that_V1.byId("dealerCombo").getSelectedKey(),
								//ZMonth:date,
								//HuddleDate : null,
								//HuddleTime : "PT00H00M00S",
								ComplaintType: data[i].ZCATEG1,
								ComplaintSource: data[i].A0CRM_ACTCAT,
								CustNo: data[i].A0SOLD_TO,
								CustName: data[i].A0SOLD_TO_T,
								ComplaintSubtype: data[i].ZCATEG2,
								ComplaintStatus: data[i].ZSTAT,
								VehiceType: data[i].A0MATERIAL__ZVERTICAL,
								Chassis: data[i].A0AU_VHVIN,
								Model: data[i].A0MATERIAL__ZMPG,
								OpenForDays: "",
								ReasonForGap: data[i].ReasonForGap,
								ReasonForGapText: data[i].ReasonForGapText,
								StartDate: that_V1.StartDate,
								StartTime: that_V1.StartTime,
								Remarks: data[i].Remarks,
								QocDeviation: data[i].QocDeviation,
								UserId: that_V1.UserID,
								SubmissionFlag: subflag

							};
							var dateFormat1 = sap.ui.core.format.DateFormat.getDateInstance({
								pattern: "yyyy-MM-ddTHH:mm:ss"
							});
							var dateval = dateFormat1.format(new Date());
							data1.HuddleDate = dateval;
							var time = dateval.split("T")[1].split(":");
							data1.HuddleTime = "PT" + time[0] + "H" + time[1] + "M" + time[2] + "S";
							data1.ComaplintCrDate = that_V1.CDate(data[i].A0CRMPOSTDAT);
							data1.ComplaintResDate = that_V1.CDate(data[i].ZRESLV_DT);
							// data1.ComplaintResDate = that_V1.CDate(data[i].ZRESLV_DT);
							data1.ComplaintCloDate = that_V1.CDate(data[i].A0CALDAY);

							if (data1.StartDate === '0000-00-00T00:00:00') {
								delete data1["StartDate"];
							}
							if (data1.HuddleDate === '0000-00-00T00:00:00') {
								delete data1["HuddleDate"];
							}
							if (data1.ComaplintCrDate === '0000-00-00T00:00:00') {
								delete data1["ComaplintCrDate"];
							}
							if (data1.ComplaintResDate === '0000-00-00T00:00:00') {
								delete data1["ComplaintResDate"];
							}
							if (data1.ComplaintCloDate === '0000-00-00T00:00:00') {
								delete data1["ComplaintCloDate"];
							}

							that_V1.CreateCall(url, data1, OdataModel);
						} else {
							that_V1._CheckRemarks = data[i].A0CRM_OBJ_ID;
						}
					}
				}

				if (that_V1._CheckRemarks !== null) {
					sap.m.MessageBox.error("Mandatory field : Remarks in Missed SLA Complaints - " + that_V1._CheckRemarks);
					that_V1._CheckRemarks = null;
				}

				var delkey = that_V1.byId("dealerCombo").getSelectedKey();
				var date = that_V1.DateFunc();
				that_V1.bindMSLACTable(delkey, date);
				that_V1.readMSLAC();
			}

		} else if (SelIconTab === "CASEMKey") {
			var OdataModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZAM_OPENCASE_HDL_BW_SRV", true);
			var data = that_V1.byId("uiTab8").getModel().getData().results;
			var selarr = data.map(function(e) {
				return e.selected;
			});
			if (selarr.indexOf(false) === -1) {
				sap.m.MessageToast.show("Select Atleast One Record");
				return;
			}
			var date = that_V1.DateFunc();
			for (var i = 0; i < data.length; i++) {

				if (!data[i].selected) {
					var checkRemarks = data[i].Remarks.trim();
					if (checkRemarks !== "") {

						var url = "/ET_AM_OPENCASE_HDL_BWSet ";

						var data1 = {
							CaseId: data[i].ZCASE_ID,
							DealerCode: that_V1.byId("dealerCombo").getSelectedKey(),
							//HuddleDate : null,
							//HuddleTime : "PT00H00M00S",
							JcNo: data[i].ZDBMORDER,
							EosNo: data[i].ZTICKET,
							ProblemStmt: data[i].ZCASE_PRS,
							CurrCaseStatus: data[i].ZCASE_ST,
							NoOfDays: data[i].A9E2ON4CECPV9VTF2BTIHXDBF7_F,
							// JcStatus :"",
							Chassis: data[i].ZCHASISN0,
							Model: data[i].ZVEH_MAT__0AU_MODEL,
							ReasonForGap: data[i].ReasonForGap,
							ReasonForGapText: data[i].ReasonForGapText,
							StartDate: that_V1.StartDate,
							StartTime: that_V1.StartTime,
							RegistrationNo: that_V1.ZVEHGUID__0CARNUMBER,
							Remarks: data[i].Remarks,
							QocDeviation: data[i].QOCDeviation,
							UserId: that_V1.UserID,
							SubmissionFlag: subflag

						};
						var dateFormat1 = sap.ui.core.format.DateFormat.getDateInstance({
							pattern: "yyyy-MM-ddTHH:mm:ss"
						});
						var dateval = dateFormat1.format(new Date());
						data1.HuddleDate = dateval;
						var time = dateval.split("T")[1].split(":");
						data1.HuddleTime = "PT" + time[0] + "H" + time[1] + "M" + time[2] + "S";
						// ------------------------------------------------------
						if (data[i].ZCASE_CTM_T === '') {
							var sZCASE_CTM = "000000";
						} else {
							var gtZCASE_CTM = data[i].ZCASE_CTM_T;
							var regex = /:/g;
							var sZCASE_CTM = gtZCASE_CTM.replace(regex, "");
						}
						data1.CaseCrDate = that_V1.CDate(data[i].ZCASE_CDT, sZCASE_CTM);
						data1.CaseCrTime = that_V1.CTime(sZCASE_CTM);
						// ------------------------------------------------------------
						//data1.CaseUpDate = "0000-00-00T00:00:00";
						//data1.CaseUpTime = "PT00h00M00S";

						if (data1.StartDate === '0000-00-00T00:00:00') {
							delete data1["StartDate"];
						}
						if (data1.HuddleDate === '0000-00-00T00:00:00') {
							delete data1["HuddleDate"];
						}
						if (data1.CaseCrDate === '0000-00-00T00:00:00') {
							delete data1["CaseCrDate"];
						}
						that_V1.CreateCall(url, data1, OdataModel);
					} else {
						that_V1._CheckRemarks = data[i].ZCASE_ID;
					}
				}

			}
			if (that_V1._CheckRemarks !== null) {
				sap.m.MessageBox.error("Mandatory field : Remarks in Case Management - " + that_V1._CheckRemarks);
				that_V1._CheckRemarks = null;
			}
			var delkey = that_V1.byId("dealerCombo").getSelectedKey();
			var date = that_V1.DateFunc();
			that_V1.bindCASEMTable(delkey, date);
			that_V1.readCASEM();
		} else if (SelIconTab === "RVKey") {
			var OdataModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZAM_REVISIT_HDL_BW_SRV", true);
			var data = that_V1.byId("uiTab12").getModel().getData().results;
			var selarr = data.map(function(e) {
				return e.selected;
			});
			if (selarr.indexOf(false) === -1) {
				sap.m.MessageToast.show("Select Atleast One Record");
				return;
			}
			var date = that_V1.DateFunc();
			if (btntxt === "Save as Draft") {
				for (var i = 0; i < data.length; i++) {

					if (!data[i].selected) {
						var checkRemarks = data[i].Remarks.trim();
						if (checkRemarks !== "") {
							var url = "/ET_AM_REVISIT_HDL_BWSet";

							var data1 = that_V1._payload_RV(data, i, date, subflag);
					

							that_V1.CreateCall(url, data1, OdataModel);
						} else {
							that_V1._CheckRemarks = data[i].ZDBMORDER;
						}
					}
				}
				if (that_V1._CheckRemarks !== null) {
					sap.m.MessageBox.error("Mandatory field : Remarks in Revisit - " + that_V1._CheckRemarks);
					that_V1._CheckRemarks = null;
				}
				var delkey = that_V1.byId("dealerCombo").getSelectedKey();
				var date = that_V1.DateFunc();
				that_V1.bindRVTable(delkey, date);
				that_V1.readRV();
			} else {
				// Write Submit Code here for RV TAb
				that_V1._checkMandatoryFeilds = true;
				for (var i = 0; i < data.length; i++) {
					if (data[i].ReasonForGap == "" || data[i].Remarks.trim() == "") {
						that_V1._CurrentFeild = data[i].ZDBMORDER;
						that_V1._checkMandatoryFeilds = false;
						break;
					}
				}
				if (!that_V1._checkMandatoryFeilds) {
					sap.m.MessageBox.error("Fill All Mandatory fields in Table");
					// sap.m.MessageBox.error("Fill Mandatory fields at Current JC: " + that_V1._CurrentFeild);
					that_V1._CurrentFeild = null;
				} else {
					// Save Code
					for (var i = 0; i < data.length; i++) {
						var url = "/ET_AM_REVISIT_HDL_BWSet";
						// Payload
						var data1 = that_V1._payload_RV(data, i, date, subflag);
						that_V1.CreateCall(url, data1, OdataModel);
					}
					var delkey = that_V1.byId("dealerCombo").getSelectedKey();
					var date = that_V1.DateFunc();
					that_V1.bindRVTable(delkey, date);
					that_V1.readRV();
				}

			}
		} // RV Else if Ends Here
		//============================================================
		// avn Create
		else if (SelIconTab === "epod_grnKey") {
			var OdataModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZODATA_BW_OPENGR_HDL_SRV", true);
			var data = that_V1.byId("idEpod_Grn_Table").getModel().getData().results;
			var selarr = data.map(function(e) {
				return e.selected;
			});
			if (selarr.indexOf(false) === -1) {
				sap.m.MessageToast.show("Select Atleast One Record");
				return;
			}
			var date = that_V1.DateFunc();
			for (var i = 0; i < data.length; i++) {
				// if (!data[i].selected) {
				var checkRemarks = data[i].Remarks.trim();
				if (checkRemarks !== "") {

					var url = "/ET_OPENGRN_HDL001Set";
					var data1 = {
						DealerCode: that_V1.byId("dealerCombo").getSelectedKey(),
						Material: data[i].ZSER_IS03___F2,
						BillNumber: data[i].ZSER_IS03___F43,
						VendorInvno: data[i].ZSER_IS03___F43,
						ReasonForGap: data[i].ReasonForGap,
						ReasonForGapText: data[i].ReasonForGapText,
						Remarks: data[i].Remarks,
						UserId: that_V1.UserID,
						SubmissionFlag: subflag,
						DocNum: data[i].ZSER_IS03___F1,
						DocType: data[i].ZSER_IS03___F3,
						DocNumber: data[i].ZSER_IS03___F8,
						BillQty: data[i].A62WHV1RFHY0LDVDV53BUR9AG1_F,
						Age: data[i].A62WHV1RFHY0LDTLBC17F75OVD_F,
						Status: data[i].Status
					};
					var dateFormat1 = sap.ui.core.format.DateFormat.getDateInstance({
						pattern: "yyyy-MM-ddTHH:mm:ss"
					});
					var dateval = dateFormat1.format(new Date());
					data1.HuddleDate = dateval;
					var time = dateval.split("T")[1].split(":");
					data1.HuddleTime = "PT" + time[0] + "H" + time[1] + "M" + time[2] + "S";
					data1.BillDate = that_V1.CDate(data[i].ZSER_IS03___F44);
					data1.DocDate = that_V1.CDate(data[i].ZSER_IS03___F4);
					data1.EpodDate = that_V1.CDate(data[i].ZSER_IS03___F64);
					data1.EpodTime = that_V1.CTime(data[i].ZSER_IS03___F65);
					data1.TpodDate = that_V1.CDate(data[i].ZSER_IS03___F63);

					if (data1.HuddleDate === '0000-00-00T00:00:00') {
						delete data1["HuddleDate"];
					}
					if (data1.BillDate === '0000-00-00T00:00:00') {
						delete data1["BillDate"];
					}
					if (data1.DocDate === '0000-00-00T00:00:00') {
						delete data1["DocDate"];
					}
					if (data1.EpodDate === '0000-00-00T00:00:00') {
						delete data1["EpodDate"];
					}
					if (data1.TpodDate === '0000-00-00T00:00:00') {
						delete data1["TpodDate"];
					}

					that_V1.CreateCall(url, data1, OdataModel, subflag);
					// }
				} else {
					that_V1._CheckRemarks = data[i].ZSER_IS03___F43;
				}
			}

			if (that_V1._CheckRemarks !== null) {
				sap.m.MessageBox.error("Mandatory field : Remarks in Pending GRN - " + that_V1._CheckRemarks);
				that_V1._CheckRemarks = null;
			}

			var delkey = that_V1.byId("dealerCombo").getSelectedKey();
			// var date = that_V1.DateFunc();
			that_V1.bind_EPOD_GRN_Table(delkey);
			that_V1.read_EPOD_GRN();
		}
		// ===========================================================
		else if (SelIconTab === "PIKey") {
			var OdataModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZAM_PI_ADH_HDL_BW_SRV", true);
			var data = that_V1.byId("uiTab9").getModel().getData().results;
			
			var date = that_V1.DateFunc();
			for (var i = 0; i < data.length; i++) {

				var checkRemarks = data[i].Remarks.trim();
				if (checkRemarks !== "") {
					//	if(!data[i].selected){
					var url = "/ET_PI_ADHSet";
					var data1 = {
						DealerCode: that_V1.byId("dealerCombo").getSelectedKey(),

						TotalPartLine: data[i].A9E2ON4CECPV9VXBJCXWXRI39K,
						ActualStockUpdated: data[i].A9E2ON4CECPV9VXBJCXWXYKOP4,
						NonAdherencePIReasonTxt: data[i].NonAdherencePIReasonTxt,
						NonAdherencePIReasonKey: data[i].NonAdherencePIReasonKey,
						NonAdhStockAdjReasonTxt: data[i].NonAdhStockAdjReasonTxt,
						NonAdhStockAdjReasonKe: data[i].NonAdhStockAdjReasonKe,
						StockAdjustmentDone: data[i].StockAdjustmentDone,
						StartDate: that_V1.StartDate,
						StartTime: that_V1.StartTime,
						Remarks: data[i].Remarks,
						UserId: that_V1.UserID,
						SubmissionFlag: subflag
					};
					var dateFormat1 = sap.ui.core.format.DateFormat.getDateInstance({
						pattern: "yyyy-MM-ddTHH:mm:ss"
					});
					var dateval = dateFormat1.format(new Date());
					data1.HuddleDate = dateval;
					var time = dateval.split("T")[1].split(":");
					data1.HuddleTime = "PT" + time[0] + "H" + time[1] + "M" + time[2] + "S";

					
					if (data1.StartDate === '0000-00-00T00:00:00') {
						delete data1["StartDate"];
					}
					if (data1.HuddleDate === '0000-00-00T00:00:00') {
						delete data1["HuddleDate"];
					}

					that_V1.CreateCall(url, data1, OdataModel);
					// 	}
				} else {
					that_V1._CheckRemarks = "1";
				}
			}

			if (that_V1._CheckRemarks !== null) {
				// sap.m.MessageBox.error("Mandatory field : Remarks in PI - " + that_V1._CheckRemarks);
				sap.m.MessageBox.error("Mandatory field : Remarks in PI");
				that_V1._CheckRemarks = null;
			}

		
			that_V1.onPressPI();
		} else if (SelIconTab === "PCKey") {
			var OdataModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZAM_PEND_CLAIM_H_BW_SRV", true);
			var data = that_V1.byId("uiTab13").getModel().getData().results;
			var selarr = data.map(function(e) {
				return e.selected;
			});
			if (selarr.indexOf(false) === -1) {
				sap.m.MessageToast.show("Select Atleast One Record");
				return;
			}
			var date = that_V1.DateFunc();
			for (var i = 0; i < data.length; i++) {

				if (!data[i].selected) {
					var url = "/ET_PEND_CLAIMS_HDL_BWSet";
					var data1 = {
						DealerCode: that_V1.byId("dealerCombo").getSelectedKey(),
						ClaimNo: "00003",
						HuddleDate: "\/Date(1602720000000)\/",
						HuddleTime: "PT13H14M38S",
						ClaimAmt: "1300.20",
						ClaimDate: "2020-10-07T14:05:56",
						Jcno: "",
						CustDetail: "",
						Chassis: "",
						ClaimType: "",
						CampaignId: "",
						CampaignDesc: "",
						Status: "",
						ReasonGap: data[i].ReasonGap,
						ReasonForGapText: data[i].ReasonForGapText,
						Remarks: data[i].Remarks,
						SubmissionFlag: subflag
					};
					var dateFormat1 = sap.ui.core.format.DateFormat.getDateInstance({
						pattern: "yyyy-MM-ddTHH:mm:ss"
					});
					var dateval = dateFormat1.format(new Date());
					data1.HuddleDate = dateval;
					var time = dateval.split("T")[1].split(":");
					data1.HuddleTime = "PT" + time[0] + "H" + time[1] + "M" + time[2] + "S";

					that_V1.CreateCall(url, data1, OdataModel);
				}

			}

			that_V1.readPI();
			var delkey = that_V1.byId("dealerCombo").getSelectedKey();
			var date = that_V1.DateFunc();
			that_V1.bindPITable(delkey, date);
			that_V1.onPressPI();
		}

	},
	CDate: function(date, time) {
		if (date.length === 8) {
			var Year = date.substring(0, 4);
			var Month = date.substring(4, 6);
			var Day = date.substring(6, 8);
			if (time !== undefined) {
				var Hours = time.substring(0, 2);
				var Minutes = time.substring(2, 4);
				var Seconds = time.substring(4, 6);

				return Year + "-" + Month + "-" + Day + "T" + Hours + ":" + Minutes + ":" + Seconds;
			} else {
				return Year + "-" + Month + "-" + Day + "T00:00:00";
			}
		} else {
			return "0000-00-00T00:00:00";
		}
	},
	CTime: function(Time) {
		if (Time.length === 6) {
			var Hours = Time.substring(0, 2);
			var Minutes = Time.substring(2, 4);
			var Seconds = Time.substring(4, 6);

			return "PT" + Hours + "H" + Minutes + "M" + Seconds + "S";
		} else {
			return "PT00H00M00S";
		}

	},
	CreateCall: function(url, data, OdataModel, subflag) {
		//that_V1.busyDialog.open();
		var busyDialog = new sap.m.BusyDialog();
		busyDialog.open();
		OdataModel.create(url, data, {
			success: function(oData, oResponse) {

				//that_V1.busyDialog.close();
				busyDialog.close();
				if (that_V1.subflag === "") {
					sap.m.MessageToast.show("Data Saved as Draft");
				} else {
					sap.m.MessageToast.show("Data Submitted");
				}

			},
			error: function(oError) {
				busyDialog.close();
				var message = JSON.parse(oError.response.body).error.message.value;
				sap.m.MessageBox.show(message, {
					title: "Message",
					styleClass: "sapUiSizeCompact",
					icon: sap.m.MessageBox.Icon.ERROR,
					actions: [sap.m.MessageBox.Action.OK],
					onClose: function(oAction) {

					}
				});

			},
			async: false
		});
	},
	createString: function(TabData, Tabkey, key) {
		var keys = TabData.results.map(function(e) {
			return e[Tabkey];
		});
		var String = "";
		for (var i = 0; i < keys.length; i++) {
			var String1 = key + " eq '" + keys[i] + "' or ";
			String = String + String1;
		}
		String = String.substring(0, String.length - 4);
		return String;
	},
	// Open JC Read call after create
	readOpenJC: function() {
		//that_V1.busyDialog.open();
		var DealerCode = that_V1.byId("dealerCombo").getSelectedKey();
		var OdataModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZAM_OPENJC_HDL_BW_SRV_01", true);
		var TabData = that_V1.byId("uiTab1").getModel().getData();
		if (TabData.results.length > 0) {
			var FilString = that_V1.createString(TabData, "ZDBMORDER", "Jcno");
			var Url = "/ET_AM_OpenJC_HDL_BWSet?$filter=DealerCode eq '" + DealerCode + "' and (" + FilString + ")";
		} else {
			var Url = "/ET_AM_OpenJC_HDL_BWSet?$filter=DealerCode eq '" + DealerCode + "'";
		}
		var tabfield = "ZDBMORDER";
		var rtabfield = "Jcno";
		that_V1.Generic_Read_Funct(Url, OdataModel, that_V1.byId("uiTab1").getModel(), tabfield, rtabfield);

	},
	// Missed SLA Read call after create
	readMSLA: function() {
		//that_V1.busyDialog.open();
		var DealerCode = that_V1.byId("dealerCombo").getSelectedKey();
		var OdataModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZAM_SLAJC_HDL_BW_SRV", true);

		var TabData = that_V1.byId("uiTab2").getModel().getData();
		if (TabData.results.length > 0) {
			var FilString = that_V1.createString(TabData, "ZDBMORDER", "Jcno");
			var Url = "/ET_am_slajc_hdl_bwSet?$filter=DealerCode eq '" + DealerCode + "' and (" + FilString + ")";
		} else {
			var Url = "/ET_am_slajc_hdl_bwSet?$filter=DealerCode eq '" + DealerCode + "'";
		}
		var tabfield = "ZDBMORDER";
		var rtabfield = "Jcno";
		that_V1.Generic_Read_Funct(Url, OdataModel, that_V1.byId("uiTab2").getModel(), tabfield, rtabfield);

	},
	// Open EOS Read call after create
	readOpenEOS: function() {
		//that_V1.busyDialog.open();
		var DealerCode = that_V1.byId("dealerCombo").getSelectedKey();
		var OdataModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZAM_OPENEOS_HDL_BW_SRV", true);
		//var Url = "/ET_AM_OpenEOS_HDL_BWSet?$filter=DealerCode eq '"+DealerCode+"'";
		var TabData = that_V1.byId("uiTab3").getModel().getData();
		if (TabData.results.length > 0) {
			var FilString = that_V1.createString(TabData, "ZTICKET", "EosTicketNo");
			var Url = "/ET_AM_OpenEOS_HDL_BWSet?$filter=DealerCode eq '" + DealerCode + "' and (" + FilString + ")";
		} else {
			var Url = "/ET_AM_OpenEOS_HDL_BWSet?$filter=DealerCode eq '" + DealerCode + "'";
		}
		var tabfield = "ZTICKET";
		var rtabfield = "EosTicketNo";
		that_V1.Generic_Read_Funct(Url, OdataModel, that_V1.byId("uiTab3").getModel(), tabfield, rtabfield);

	},
	// Reach Missed SLA Read call after create
	readRMSLA: function() {
		//that_V1.busyDialog.open();
		var DealerCode = that_V1.byId("dealerCombo").getSelectedKey();
		var OdataModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZAM_SLAEOS_HDL_BW_SRV", true);
		//var Url = "/ET_AM_SLAEOS_HDL_BWSet?$filter=DealerCode eq '"+DealerCode+"'";
		var TabData = that_V1.byId("uiTab4").getModel().getData();
		if (TabData.results.length > 0) {
			var FilString = that_V1.createString(TabData, "ZTICKET", "EosTicketNo");
			var Url = "/ET_AM_SLAEOS_HDL_BWSet?$filter=DealerCode eq '" + DealerCode + "' and (" + FilString + ")";
		} else {
			var Url = "/ET_AM_SLAEOS_HDL_BWSet?$filter=DealerCode eq '" + DealerCode + "'";
		}
		var tabfield = "ZTICKET";
		var rtabfield = "EosTicketNo";
		that_V1.Generic_Read_Funct(Url, OdataModel, that_V1.byId("uiTab4").getModel(), tabfield, rtabfield);

	},
	// Resolution Missed SLA Read call after create
	readRSMSLA: function() {

		var DealerCode = that_V1.byId("dealerCombo").getSelectedKey();
		var OdataModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZAM_RES_SLAEOS_H_BW_SRV", true);
		//var Url = "/ET_AM_RES_SLAEOS_HDL_BWSet?$filter=DealerCode eq '"+DealerCode+"'";
		var TabData = that_V1.byId("uiTab5").getModel().getData();
		if (TabData.results.length > 0) {
			var FilString = that_V1.createString(TabData, "ZTICKET", "EosTicketNo");
			var Url = "/ET_AM_RES_SLAEOS_HDL_BWSet?$filter=DealerCode eq '" + DealerCode + "' and (" + FilString + ")";
		} else {
			var Url = "/ET_AM_RES_SLAEOS_HDL_BWSet?$filter=DealerCode eq '" + DealerCode + "'";
		}
		var tabfield = "ZTICKET";
		var rtabfield = "EosTicketNo";
		that_V1.Generic_Read_Funct(Url, OdataModel, that_V1.byId("uiTab5").getModel(), tabfield, rtabfield);

	},
	// Open Complaints Read call after create
	readOC: function() {

		var DealerCode = that_V1.byId("dealerCombo").getSelectedKey();
		var OdataModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZAM_OPENCOMPL_HDL_BW_SRV", true);
		//var Url = "/ET_AM_OPENCOMPL_HDL_BWSet?$filter=DealerCode eq '"+DealerCode+"'";
		var TabData = that_V1.byId("uiTab6").getModel().getData();
		if (TabData.results.length > 0) {
			var FilString = that_V1.createString(TabData, "A0CRM_OBJ_ID", "ComplaintNo");
			var Url = "/ET_AM_OPENCOMPL_HDL_BWSet?$filter=DealerCode eq '" + DealerCode + "' and (" + FilString + ")";
		} else {
			var Url = "/ET_AM_OPENCOMPL_HDL_BWSet?$filter=DealerCode eq '" + DealerCode + "'";
		}
		var tabfield = "A0CRM_OBJ_ID"; // Complaint No.
		var rtabfield = "ComplaintNo";
		that_V1.Generic_Read_Funct(Url, OdataModel, that_V1.byId("uiTab6").getModel(), tabfield, rtabfield);

	},
	//Missed SLA Complaints Read call after create
	readMSLAC: function() {

		var DealerCode = that_V1.byId("dealerCombo").getSelectedKey();
		var OdataModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZAM_SLACOMPL_HDL_BW_SRV", true);
		//var Url = "/ET_AM_SLACOMPL_HDL_BWSet?$filter=DealerCode eq '"+DealerCode+"'";
		var TabData = that_V1.byId("uiTab7").getModel().getData();
		if (TabData.results.length > 0) {
			var FilString = that_V1.createString(TabData, "A0CRM_OBJ_ID", "ComplaintNo");
			var Url = "/ET_AM_SLACOMPL_HDL_BWSet?$filter=DealerCode eq '" + DealerCode + "' and (" + FilString + ")";
		} else {
			var Url = "/ET_AM_SLACOMPL_HDL_BWSet?$filter=DealerCode eq '" + DealerCode + "'";
		}
		var tabfield = "A0CRM_OBJ_ID";
		var rtabfield = "ComplaintNo";
		that_V1.Generic_Read_Funct(Url, OdataModel, that_V1.byId("uiTab7").getModel(), tabfield, rtabfield);

	},
	readCASEM: function() {

		var DealerCode = that_V1.byId("dealerCombo").getSelectedKey();
		var OdataModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZAM_OPENCASE_HDL_BW_SRV", true);
		//var Url = "/ET_AM_OPENCASE_HDL_BWSet?$filter=DealerCode eq '"+DealerCode+"'";
		var TabData = that_V1.byId("uiTab8").getModel().getData();
		if (TabData.results.length > 0) {
			var FilString = that_V1.createString(TabData, "ZCASE_ID", "CaseId");
			var Url = "/ET_AM_OPENCASE_HDL_BWSet?$filter=DealerCode eq '" + DealerCode + "' and (" + FilString + ")";
		} else {
			var Url = "/ET_AM_OPENCASE_HDL_BWSet?$filter=DealerCode eq '" + DealerCode + "'";
		}
		var tabfield = "ZCASE_ID";
		var rtabfield = "CaseId";
		that_V1.Generic_Read_Funct(Url, OdataModel, that_V1.byId("uiTab8").getModel(), tabfield, rtabfield);
	},
	readPI: function() {
		var DealerCode = that_V1.byId("dealerCombo").getSelectedKey();
		//var date=that_V1.byId("DP10").getDateValue();

		var dateFormat1 = sap.ui.core.format.DateFormat.getDateInstance({
			pattern: "yyyy-MM-ddTHH:mm:ss"
		});
		var dateval = dateFormat1.format(new Date());
		var OdataModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZAM_PI_ADH_HDL_BW_SRV", true);
		var Url = "/ET_PI_ADHSet?$filter=DealerCode eq '" + DealerCode + "'and HuddleDate eq datetime'" + dateval + "'";

		var tabfield = "ZTICKET";
		var rtabfield = "";
		that_V1.Generic_Read_Funct(Url, OdataModel, that_V1.byId("uiTab9").getModel(), tabfield, rtabfield);
	},
	readRV: function() {
		var DealerCode = that_V1.byId("dealerCombo").getSelectedKey();
		//var date=that_V1.byId("DP10").getDateValue();
		var dateval = that_V1.DateFunc();
		var OdataModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZAM_REVISIT_HDL_BW_SRV", true);
		//var Url = "/ET_AM_REVISIT_HDL_BWSet?$filter=CurrentDealer  eq '"+DealerCode+"'and Month  eq '"+dateval+"'";
		var TabData = that_V1.byId("uiTab12").getModel().getData();
		if (TabData.results.length > 0) {
			var FilString = that_V1.createString(TabData, "ZDBMORDER", "CurrentJc");
			var Url = "/ET_AM_REVISIT_HDL_BWSet?$filter=CurrentDealer  eq '" + DealerCode + "'and Month  eq '" + dateval + "' and (" +
				FilString +
				")";
		} else {
			var Url = "/ET_AM_REVISIT_HDL_BWSet?$filter=CurrentDealer  eq '" + DealerCode + "'and Month  eq '" + dateval + "'";
		}
		var tabfield = "ZDBMORDER";
		var rtabfield = "CurrentJc";
		that_V1.Generic_Read_Funct(Url, OdataModel, that_V1.byId("uiTab12").getModel(), tabfield, rtabfield);
	},
	//avn commnet
	read_EPOD_GRN: function() {
		var DealerCode = that_V1.byId("dealerCombo").getSelectedKey();
		var dateval = that_V1.DateFunc();
		var OdataModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZODATA_BW_OPENGR_HDL_SRV", true);
		var TabData = that_V1.byId("idEpod_Grn_Table").getModel().getData();
		if (TabData.results.length > 0) {
			var FilString = that_V1.createString(TabData, "ZSER_IS03___F43", "BillNumber");
			var FilString1 = that_V1.createString(TabData, "ZSER_IS03___F2", "Material");
			var Url = "/ET_OPENGRN_HDL001Set?$filter=DealerCode eq '" + DealerCode + "' and (" + FilString + ") and (" + FilString1 + ")";
		} else {
			var Url = "/ET_OPENGRN_HDL001Set?$filter=DealerCode eq '" + DealerCode + "'";
		}
		var tabfield = "ZSER_IS03___F43";
		var rtabfield = "VendorInvno";
		var tabMatfield = "ZSER_IS03___F2";
		var rabMatfield = "Material";
		that_V1.Generic_Read_EPOD_Funct(Url, OdataModel, that_V1.byId("idEpod_Grn_Table").getModel(), tabfield, rtabfield, tabMatfield,
			rabMatfield);
	},
	read_EPOD_Sumry_GRN: function() {
		var DealerCode = that_V1.byId("dealerCombo").getSelectedKey();
		var dateval = that_V1.DateFunc();
		var OdataModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZSER_IS03_Q0002_SRV", true);
		var Url = "/ZSER_IS03_Q0002Results?$filter=DealerCode eq '" + DealerCode + "'";
		var TabData = that_V1.byId("idSumryEpod_Grn_Table").getModel().getData();
		var tabfield = "";
		var rtabfield = "";
		that_V1.Generic_Read_Funct(Url, OdataModel, that_V1.byId("idSumryEpod_Grn_Table").getModel(), tabfield, rtabfield);
	},

	//read Url for Pending Claims
	readPC: function() {
		var DealerCode = that_V1.byId("dealerCombo").getSelectedKey();
		//var date=that_V1.byId("DP10").getDateValue();
		var dateval = that_V1.DateFunc();
		var OdataModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZAM_PEND_CLAIM_H_BW_SRV", true);
		var Url = "/ET_PEND_CLAIMS_HDL_BWSet ?$filter=ClaimNo   eq '" + DealerCode + "'";
		that_V1.Generic_Read_Funct(Url, OdataModel);
	},

	Generic_Read_EPOD_Funct: function(Url, OdataModel, tabModel, tabfield, rtabfield, tabMatfield, rabMatfield) {
		OdataModel.read(Url, {
			async: false,
			success: function(oData, oResp) {
				if (oResp.requestUri.indexOf("ET_OPENGRN_HDL001Set") > -1) {
					that_V1.EPODGRN_T_DATA = oData.results;
					var tabData = tabModel.getData();
					var tableId = that_V1.getView().byId("idEpod_Grn_Table");
					var tableModel = tableId.getModel();
					// tableModel.getData().results[i].Status;
					for (var i = 0; i < tabData.results.length; i++) {
						for (var j = 0; j < oData.results.length; j++) {
							if (tabData.results[i][tabfield] === oData.results[j][rtabfield] && tabData.results[i][tabMatfield] === oData.results[j][
									rabMatfield
								]) {
								tabData.results[i].Remarks = oData.results[j].Remarks;
								tabData.results[i].ReasonForGap = oData.results[j].ReasonForGap;
								tabData.results[i].HuddleDate = oData.results[j].HuddleDate;
								tabData.results[i].Status = oData.results[j].Status;
							}
						}
					}
					tabModel.refresh(true);
				}
			},
			error: function(oErr) {
				var message = JSON.parse(oErr.response.body).error.message.value;
				sap.m.MessageBox.show(message, {
					title: "Message",
					styleClass: "sapUiSizeCompact",
					icon: sap.m.MessageBox.Icon.ERROR,
					actions: [sap.m.MessageBox.Action.OK],
					onClose: function(oAction) {

					}
				});
			}
		});
	},

	Generic_Read_Funct: function(Url, OdataModel, tabModel, tabfield, rtabfield) {
		//that_V1.busyDialog.open();
		var busyDialog = new sap.m.BusyDialog();
		busyDialog.open();
		OdataModel.read(Url, {
			async: false,
			success: function(oData, oResp) {
				//that_V1.busyDialog.close(); 

				if (oResp.requestUri.indexOf("ET_AM_OpenJC_HDL_BWSet") > -1) {
					that_V1.openJCData = oData.results;
				} else if (oResp.requestUri.indexOf("ET_am_slajc_hdl_bwSet") > -1) {
					that_V1.MSLAData = oData.results;
				} else if (oResp.requestUri.indexOf("ET_AM_OpenEOS_HDL_BWSet") > -1) {
					that_V1.openEOSData = oData.results;
				} else if (oResp.requestUri.indexOf("ET_AM_SLAEOS_HDL_BWSet") > -1) {
					that_V1.RMSLAData = oData.results;
				} else if (oResp.requestUri.indexOf("ET_AM_RES_SLAEOS_HDL_BWSet") > -1) {
					that_V1.RSMSLAData = oData.results;
				} else if (oResp.requestUri.indexOf("ET_AM_OPENCOMPL_HDL_BWSet") > -1) {
					that_V1.OCData = oData.results;
				} else if (oResp.requestUri.indexOf("ET_AM_SLACOMPL_HDL_BWSet") > -1) {
					that_V1.MSLACData = oData.results;
				} else if (oResp.requestUri.indexOf("ET_AM_OPENCASE_HDL_BWSet") > -1) {
					that_V1.CASEMData = oData.results;
				} else if (oResp.requestUri.indexOf("ET_AM_REVISIT_HDL_BWSet") > -1) {
					that_V1.RVData = oData.results;
				} else if (oResp.requestUri.indexOf("ET_OPENGRN_HDL001Set") > -1) {
					that_V1.EPODGRN_T_DATA = oData.results;
				} else if (oResp.requestUri.indexOf("ZSER_IS03_Q0002Results") > -1) {
					that_V1.EPODGRN_Sumry_T_DATA = oData.results;
				} else if (oResp.requestUri.indexOf("ET_PI_ADHSet") > -1) {

					var tabData = that_V1.byId("uiTab9").getModel().getData();
					for (var i = 0; i < tabData.results.length; i++) {
						for (var j = 0; j < oData.results.length; j++) {

							tabData.results[i].Remarks = oData.results[j].Remarks;
							tabData.results[i].StockAdjustmentDone = oData.results[j].StockAdjustmentDone;
							tabData.results[i].NonAdhStockAdjReasonKe = oData.results[j].NonAdhStockAdjReasonKe;
							tabData.results[i].NonAdherencePIReasonKey = oData.results[j].NonAdherencePIReasonKey;

						}
					}
					that_V1.byId("uiTab9").getModel().refresh(true);
					busyDialog.close();
					return;
				}
				var tabData = tabModel.getData();
				for (var i = 0; i < tabData.results.length; i++) {
					for (var j = 0; j < oData.results.length; j++) {
						if (tabData.results[i][tabfield] === oData.results[j][rtabfield]) {
							tabData.results[i].Remarks = oData.results[j].Remarks;
							tabData.results[i].ReasonForGap = oData.results[j].ReasonForGap;
							tabData.results[i].QocDeviation = oData.results[j].QocDeviation;
							tabData.results[i].HuddleDate = oData.results[j].HuddleDate;
							tabData.results[i].FloatUsed = oData.results[j].FloatUsed;
						}
					}
				}
				tabModel.refresh(true);
				busyDialog.close();

			},
			error: function(oErr) {
				busyDialog.close();
				var message = JSON.parse(oErr.response.body).error.message.value;
				sap.m.MessageBox.show(message, {
					title: "Message",
					styleClass: "sapUiSizeCompact",
					icon: sap.m.MessageBox.Icon.ERROR,
					actions: [sap.m.MessageBox.Action.OK],
					onClose: function(oAction) {

					}
				});
				//that_V1.busyDialog.close();

			}

		});
	},
	CreateCall1: function() {
		var OdataModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/zam_walkthrough_bw_srv", true);
		var data = {
			WalkthroughId: "00000002",
			DealerCode: "",
			ModuleKey: "02",
			ActivityKey: "1.2",
			PicUrlKey: "1.1.2",
			DealerName: "",
			SubmissionMonth: "",
			moduleDesc: "",
			ActivityDesc: "Inspection of Security register",
			Observation: "Writing Register as per DOS format",
			Status: "Ok",
			ActionPlan: "",
			Responsibility: "",
			TargetDate: "\/Date(1602028800000)\/",
			ImplStatus: "",
			ImplDate: "\/Date(1602028800000)\/",
			PicUrl: "",
			ModuleCrDate: "\/Date(1602028800000)\/",
			ModuleSubDate: "\/Date(1602028800000)\/",
			ModuleUpDate: "\/Date(1602028800000)\/",
			WalkthCrDate: "\/Date(1602028800000)\/",
			WalkthSubDate: null,
			WalkthUpDate: "\/Date(1602028800000)\/",
			WalkthSubFlag: "",
			UserId: "02",
			UserName: "",
			DealershipRole: "",
			WalkthDelFlag: ""
		};
		//that_V1.busyDialog.open();
		var busyDialog = new sap.m.BusyDialog();
		busyDialog.open();
		OdataModel.create("ET_AM_WALKTHROUGH_BWSet", data, {
			success: function(oData, oResponse) {

				//that_V1.busyDialog.close();
				busyDialog.close();

			},
			error: function(oError) {
				that_V1.busyDialog.close();
				var message = JSON.parse(oError.response.body).error.message.value;
				sap.m.MessageBox.show(message, {
					title: "Message",
					styleClass: "sapUiSizeCompact",
					icon: sap.m.MessageBox.Icon.ERROR,
					actions: [sap.m.MessageBox.Action.OK],
					onClose: function(oAction) {

					}
				});

			},
			async: false
		});
	},

	/**
	 * On Submit all press
	 */
	_checkMandatoryFeildsHdl_Btn: null,
	_checkSaveSend: '',
	onAllSubmitPress: function() {
		var SelIconTab = that_V1.byId("ITBId").getSelectedKey();
		that_V1._checkSaveSend = true;
		that_V1._checkMandatoryFeildsHdl_Btn = true;
		if (SelIconTab === "OJKey") {
			var ojctab = that_V1.byId("ojctb").getPressed();
			var mslatab = that_V1.byId("mslatb").getPressed();
			
			// Open JC
			if (ojctab === true) {
				var data = that_V1.byId("uiTab1").getModel().getData().results;
				if (data.length !== 0) {
					for (var i = 0; i < data.length; i++) {
						if (data[i].ReasonForGap == "" || data[i].Remarks.trim() == "") {
							that_V1._checkMandatoryFeildsHdl_Btn = false;
							that_V1._checkSaveSend = false;
							break;
						}
					}
					if (!that_V1._checkMandatoryFeildsHdl_Btn) {
						sap.m.MessageBox.error("Fill All Mandatory fields in Table");
						that_V1._checkSaveSend = false;
					} else {
						that_V1._checkSaveSend = false;
						that_V1.allSave();
					}
				} else {
					sap.m.MessageBox.error("No Data in Table");
					that_V1._checkSaveSend = false;
				}
			}

			// Missed Sla 
			if (mslatab === true) {
				var data = that_V1.byId("uiTab2").getModel().getData().results;
				if (data.length !== 0) {
					for (var i = 0; i < data.length; i++) {
						if (data[i].ReasonForGap == "" || data[i].Remarks.trim() == "") {
							that_V1._checkMandatoryFeildsHdl_Btn = false;
							that_V1._checkSaveSend = false;
							break;
						}
					}
					if (!that_V1._checkMandatoryFeildsHdl_Btn) {
						sap.m.MessageBox.error("Fill All Mandatory fields in Table");
						that_V1._checkSaveSend = false;
						// }
					} else {
						that_V1._checkSaveSend = false;
						that_V1.allSave();
					}
				} else {
					sap.m.MessageBox.error("No Data in Table");
					that_V1._checkSaveSend = false;
				}
			}
		}

		// // Revisit Tab table
		if (SelIconTab === 'RVKey') {
			var data = that_V1.byId("uiTab12").getModel().getData().results;
			if (data.length !== 0) {
				for (var i = 0; i < data.length; i++) {
					if (data[i].ReasonForGap == "" || data[i].Remarks.trim() == "") {
						that_V1._checkMandatoryFeildsHdl_Btn = false;
						that_V1._checkSaveSend = false;
						break;
					}
				}
				if (!that_V1._checkMandatoryFeildsHdl_Btn) {
					if (data.length === 0) {
						sap.m.MessageBox.error("No Data in Table");
						that_V1._checkSaveSend = false;
					} else {
						sap.m.MessageBox.error("Fill All Mandatory fields in Table");
						that_V1._checkSaveSend = false;
					}
				} else {
					that_V1._checkSaveSend = false;
					that_V1.allSave();
				}
			} else {
				sap.m.MessageBox.error("No Data in Table");
				that_V1._checkSaveSend = false;
			}

		}

		if (that_V1._checkSaveSend === true) {
			that_V1.allSave();
		}

	},

	allSave: function() {
		var OdataModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZAM_SUBMIT_HDL_SRV", true);
		var dateFormat1 = sap.ui.core.format.DateFormat.getDateInstance({
			pattern: "yyyy-MM-ddTHH:mm:ss"
		});
		var dateval = dateFormat1.format(new Date());
		var time = dateval.split("T")[1].split(":");
		var oDataEntry = {};
		oDataEntry.DealerCode = that_V1.byId("dealerCombo").getSelectedKey();
		oDataEntry.HuddleDate = dateval;
		oDataEntry.HuddleTime = "PT" + time[0] + "H" + time[1] + "M" + time[2] + "S";
		oDataEntry.StartDate = that_V1.StartDate;
		oDataEntry.StartTime = that_V1.StartTime;
		oDataEntry.UserId = that_V1.UserID;
		oDataEntry.SubmissionFlag = "X";

		var busyDialog = new sap.m.BusyDialog();
		busyDialog.open();
		OdataModel.create("/ET_SUBMITHDLSet", oDataEntry, {
			success: function(oData, oResponse) {
				busyDialog.close();
				sap.m.MessageToast.show("Huddle has been submitted successfully");
			},
			error: function(oError) {
				that_V1.busyDialog.close();
				var message = JSON.parse(oError.response.body).error.message.value;
				sap.m.MessageBox.show(message, {
					title: "Message",
					styleClass: "sapUiSizeCompact",
					icon: sap.m.MessageBox.Icon.ERROR,
					actions: [sap.m.MessageBox.Action.OK],
					onClose: function(oAction) {

					}
				});

			},
			async: false
		});
	}

});
