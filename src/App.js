import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import "semantic-ui-css/semantic.min.css"
import {   BrowserRouter as Router, Route, Switch,Redirect } from "react-router-dom"
import SignIn from "./component/SignIn";
import Tixy from "./component/Tixy";
import AddTixy from "./component/addTixy";
import ViewTixy from "./component/ViewTixy"
import Signup from "./component/Signup";
import MyTeam from "./Team/MyTeam";
import EditTixy from "./component/EditTixy";
import Product from "./Product/Product"
import ProductInfo from "./Product/ProductInfo";
import Client from "./Client/Client"
import Assets  from "./Assets/Assets";
import AddAssets  from "./Assets/AddAssets";
import ThermoInvoice  from "./Assets/ThermoInvoice";
import ThermoQuotation  from "./Assets/ThermoQuotation";
import ThermoPerforma  from "./Assets/ThermoPerforma";
import ThermoPurchase  from "./Assets/ThermoPurchase";
import ThermoService  from "./Assets/ThermoService";
import ThermoJobCard  from "./Assets/ThermoJobCard";

import Lead from "./Lead/Lead";
import AddLead from "./Lead/AddLead";
import EditLead from "./Lead/EditLead";
import ViewLead from "./Lead/ViewLead";

import Transmute from "./Client/Transmute";
import BillingInfo from "./Client/BillingInfo";
import BillingAddrList  from "./Client/BillingAddrList";
import ShipAddrList  from "./Client/ShipAddrList";
import InvoiceHistory from "./Client/InvoiceHistory";
import QuotationHistory  from "./Client/QuotationHistory"
// import VendorView from "./component/Vendor/VendorView";
import VendorView from "./Vendor/VendorView";
import Vendor from "./Vendor/Vendor";
import VendorBillingAddrList from "./Vendor/VendorBillingAddrList";
import VendorBillingInfo from "./Vendor/VendorBillingInfo";
import Vendorinvoice from "./Vendor/Vendorinvoice";
import VendorShipAddrList from "./Vendor/VendorShipAddrList";
import VendorTransmute from "./Vendor/VendorTransmute";
// import View from "./component/View";
import View from  "./Vendor/View";
import EditProduct from "./Product/EditProduct";
import ViewProduct from "./Product/ViewProduct"
import EditAssets  from "./Assets/EditAssets"
import ViewAssets  from "./Assets/ViewAssets";
import Sale  from "./Sale/Sale";


import Action from "./Action/Action";
import AddAction from "./Action/AddAction";
import EditAction from "./Action/EditAction";
import ViewAction from "./Action/ViewAction";


import ClientGodView from "./Client/ClientGodView";
import EditClient from "./Client/EditClient";
import EditTransmute from  "./Client/EditTransmute";
import EditBillingInfo from "./Client/EditBillingInfo";
import ViewClient from "./Client/ViewClient";
import ViewTransmute from "./Client/ViewTransmute";
import EditVendor from "./Vendor/EditVendor";
import ViewBillindaddr from "./Client/ViewBillindaddr";
import EditVendorTransmute from "./Vendor/EditVendorTransmute";
import EditVendorBillingInfo from "./Vendor/EditVendorBillingInfo";
import ViewVendorTransmute from "./Vendor/ViewVendorTransmute";
import ViewVendorBillindaddr from "./Vendor/ViewVendorBillindaddr";

import AddTeam from "./Team/AddTeam";
import EditTeam from "./Team/EditTeam";
import ViewTeam from "./Team/ViewTeam";

import Side from "./component/Sidenav"


import DMS from "./DMS/DMS"

import AddDMS from "./DMS/AddDMS"

import EditDMS from "./DMS/EditDMS"

import ViewDMS from "./DMS/ViewDMS"


//Invoices
import InvoiceGodView from "./Sale/Invoice/InvoiceGodView"
import AddInvoice from "./Sale/Invoice/AddInvoice"
import InvoiceBill from "./Sale/Invoice/InvoiceBill"
import Cart from "./Sale/Invoice/Cart"
import PaymentBill from "./Sale/Invoice/PaymentBill"

//Quotation

import QuotationGodView from "./Sale/Quotation/QuotationGodView"
import QuoatationInvoice from "./Sale/Quotation/QuoatationInvoice"
import QuoatationBill from "./Sale/Quotation/QuoatationBill"
import QuoatationCart from "./Sale/Quotation/QuoatationCart"
import QuotationBillpay from "./Sale/Quotation/QuotationBillpay"


//performa


import PerformaGodView from "./Sale/Performa/PerformaGodView"
import PerformaInvoice from "./Sale/Performa/PerformaInvoice"
import PerformaeBill from "./Sale/Performa/PerformaeBill"
import PerformaCart from "./Sale/Performa/PerformaCart"
import PerformaBillpayment from "./Sale/Performa/PerformaBillpayment"

//Purchase Order

import PurchaseOrderGodView from "./Sale/PurchaseOrder/PurchaseOrderGodView"
import PurchaseOrderInvoice from "./Sale/PurchaseOrder/PurchaseOrderInvoice"
import PurchaseOrderBill from "./Sale/PurchaseOrder/PurchaseOrderBill"
import PurchaseOrderCart from "./Sale/PurchaseOrder/PurchaseOrderCart"
import PurchaseOrderPaymentBill from "./Sale/PurchaseOrder/PurchaseOrderPaymentBill"

//Service

import ServiceOrderGodView from "./Sale/Service/ServiceOrderGodView"
import ServiceOrderInvoice from "./Sale/Service/ServiceOrderInvoice"
import ServiceOrderBill from "./Sale/Service/ServiceOrderBill"
import ServiceOrderCart from "./Sale/Service/ServiceOrderCart"
import ServiceOrderPaymentBill from "./Sale/Service/ServiceOrderPaymentBill"

import Setting from "./Setting/Setting";

import ContractGodsView from "./ContractMgmt/ContractGodsView";
import AddContract from "./ContractMgmt/AddContract";
import EditContract from "./ContractMgmt/EditContract";
import ViewContract from "./ContractMgmt/ViewContract";

import LeadGodsView from "./LeadMgmt/LeadGodsView";
import LeadAdd from "./LeadMgmt/LeadAdd";
import LeadEdit from "./LeadMgmt/LeadEdit";
import LeadView from "./LeadMgmt/LeadView";
import DashBoard from "./DashBoard/DashBoard";


const Authorization = (WrappedComponent, allowedRoles, user, userRole) => {
  return class WithAuthorization extends React.Component {
    constructor(props) {
      super(props);

      // In this case the user is hardcoded, but it could be loaded from anywhere.
      // Redux, MobX, RxJS, Backbone...
      this.state = {};
    }

    render() {
      const role = userRole;
      if (allowedRoles.includes(role)) {
        return (
          <WrappedComponent {...this.props} user={user} userRole={userRole} />
        );
      } else {
        return <Redirect to="/dash" />;
      }
    }
  };
};


// Authorization HOC
// const Authorization = (
//   WrappedComponent,
//   allowedRoles,
//   user,
//   userRole,
//   routeProps
// ) => {
//   return (
//     <div>
//       {!user && <Redirect to="/"/>}
//       {allowedRoles.includes(userRole) ? (
//         <WrappedComponent
//           {...routeProps}
//           {...this.props}
//           user={user}
//           userRole={userRole}
//         />
//       ) : (
//         <Redirect to="/" />
//       )}
//     </div>
//   )
// }


class App extends Component {


  state = {
    user: {},
    userRole: "",
    loggedIn: false,
    loading: false
  }

  signInUser = userObj => {
    //console.log("signin happening")
    const { user, userRole, loggedIn, loading } = userObj

    this.setState({
      user,
      userRole,
      loggedIn,
      loading
    })
  }

  signOutUser = () => {
    this.setState({
      user: "",
      userRole: "admin",
      loggedIn: false
    })
  }



  render() {

    const user = this.state.user
    const userRole = this.state.userRole
    const ManagerRole = ["Admin", "CEO/ Director","Business Manager","Service Manager","Sales Manager","Sales Engineer","Service Engineer","Back Office Executive","Back Office Support","HR/ IT Manager","HR Executive","Accounts Manager","Accounts Executive","Operations Manager"]

    return (

      <div className="App">
      <Switch>

 {/*
      <Route
      path="/"
      render={routeProps => (
        <SignIn
          {...routeProps}
          user={user}
          userRole={userRole}
          signInUser={this.signInUser}
        />
      )}
    />

   */}

      <Route
      exact
      path="/"
      render={() => <SignIn  />}
    />


    <Route
      exact
      path="/invoice"
      render={() => <ThermoInvoice  />}
    />

    <Route
      exact
      path="/quotation"
      render={() => <ThermoQuotation  />}
    />

    <Route
      exact
      path="/performa"
      render={() => <ThermoPerforma  />}
    />

    <Route
      exact
      path="/purchase"
      render={() => <ThermoPurchase  />}
    />

    <Route
      exact
      path="/service"
      render={() => <ThermoService  />}
    />

    <Route
      exact
      path="/jobcard"
      render={() => <ThermoJobCard  />}
    />
    
    <Route
    exact
    path="/Signup"
    render={() => <Signup/>}
    />

    <Route
    exact
    path="/MyTeam"
    render={() => <MyTeam />}
    />
    
    <Route
    path="/MyTeam"
            exact
            render={routeProps =>
              Authorization(
                MyTeam,
                ["Admin","HR/IT Manager","HR Executive","Accounts Manager","Accounts Executive"],
                user,
                userRole,
                routeProps
              )
            }
            />


    
    <Route
    exact
    path="/AddTeam"
  render={() => <AddTeam/>}
  />


  <Route
  exact
  path="/EditTeam"
  render={() => <EditTeam />}
  />

  <Route
  exact
  path="/ViewTeam"
  render={() => <ViewTeam />}
  />



  <Route
  exact
  path="/Tixy"
  render={() => <Tixy/>}
  /> 
{/*   
    <Route
    path="/Tixy"
            exact
            render={routeProps =>
              Authorization(
                Tixy,
                ["CEO/Director", "Business Manager", "Service Manager", "Admin","Sales Manager","Sales Engineer","Service Engineer","Back Office Executive","Back Office Support","Operation Manger"],
                user,
                userRole,
                routeProps
              )
            }
            />
             */}
  <Route
    exact
    path="/AddTixy"
    render={() => <AddTixy />}
  />
  <Route
  exact
  path="/EditTixy"
  render={() => <EditTixy />}
/>
  <Route
  exact
  path="/ViewTixy"
  render={() => <ViewTixy />}
/>

<Route
  exact
  path="/Product"
  render={() => <Product />}
/>

<Route
    path="/Product"
            exact
            render={routeProps =>
              Authorization(
                Product,
                ["Business Manager", "Admin","Sales Manager","Back Office Executive","Back Office Support","Operation Manger"],
                user,
                userRole,
                routeProps
              )
            }
            />



<Route
  exact
  path="/ProductInfo"
  render={() => <ProductInfo />}
/>



<Route
  exact
  path="/Client"
  render={() => <Client />}
/>


<Route
    path="/Client"
            exact
            render={routeProps =>
              Authorization(
                Client,
                ["CEO/Director", "Business Manager", "Service Manager", "Admin","Sales Manager","Back Office Executive","Operation Manger","Accounts Manager","HR/IT Manager"],
                user,
                userRole,
                routeProps
              )
            }
            />
    


<Route
  exact
  path="/Assets"
  render={() => <Assets />}
/>


<Route
    path="/Assets"
            exact
            render={routeProps =>
              Authorization(
                Assets,
                ["Business Manager", "Admin","Service Manager","Sales Manager","Back Office Executive","Back Office Support"],
                user,
                userRole,
                routeProps
              )
            }
            />

<Route
  exact
  path="/AddAssets"
  render={() => <AddAssets />}
/>

<Route
  exact
  path="/Lead"
  render={() => <Lead />}
/>


<Route
    path="/Lead"
            exact
            render={routeProps =>
              Authorization(
                Lead,
                ["CEO/Director", "Business Manager", "Admin","Sales Manager","Back Office Executive","Operation Manger"],
                user,
                userRole,
                routeProps
              )
            }
            />


<Route
  exact
  path="/AddLead"
  render={() => <AddLead />}
/>

{/*

  <Route
  exact
  path="/Transmute"
  render={() => <Transmute />}
/>

*/}

<Route
  exact
  path="/BillingInfo"
  render={() => <BillingInfo />}
/>

<Route
  exact
  path="/BillingAddrList"
  render={() => <BillingAddrList />}
/>

<Route
  exact
  path="/ShipAddrList"
  render={() => <ShipAddrList />}
/>

<Route
  exact
  path="/InvoiceHistory"
  render={() => <InvoiceHistory />}
/>

<Route
  exact
  path="/QuotationHistory"
  render={() => <QuotationHistory />}
/>

<Route
  exact
  path="/VendorView"
  render={() => <VendorView />}
/>

<Route
    path="/VendorView"
            exact
            render={routeProps =>
              Authorization(
                VendorView,
                ["CEO/Director","Admin","Back Office Executive","Operation Manger","Accounts Manager","Accounts Executive"],
                user,
                userRole,
                routeProps
              )
            }
            />



<Route
  exact
  path="/Vendor"
  render={() => <Vendor/>}
/>





<Route
  exact
  path="/VendorTransmute"
  render={() => <VendorTransmute />}
/>

<Route
  exact
  path="/VendorBillingInfo"
  render={() => <VendorBillingInfo />}
/>

<Route
  exact
  path="/VendorBillingAddrList"
  render={() => <VendorBillingAddrList />}
/>

<Route
  exact
  path="/VendorShipAddrList"
  render={() => <VendorShipAddrList />}
/>

<Route
  exact
  path="/Vendorinvoice"
  render={() => <Vendorinvoice />}
/>

<Route
  exact
  path="/View"
  render={() => <View/>}
/>

<Route
  exact
  path="/EditLead"
  render={() => <EditLead/>}
/>

<Route
  exact
  path="/ViewLead"
  render={() => <ViewLead/>}
/>

<Route
  exact
  path="/ViewProduct"
  render={() => <ViewProduct/>}
/>

<Route
  exact
  path="/EditProduct"
  render={() => <EditProduct/>}
/>


<Route
  exact
  path="/EditAssets"
  render={() => <EditAssets/>}
/>

<Route
  exact
  path="/ViewAssets"
  render={() => <ViewAssets/>}
/>

<Route
  exact
  path="/Sale"
  render={() => <Sale/>}
/>

 <Route
    path="/Sale"
            exact
            render={routeProps =>
              Authorization(
                Sale,
                ["Admin","CEO/Director","Business Manager","Sales Manager","Sales Engineer","Back Office Executive","HR Executive","HR/ IT Manager","Operations Manager"],
                user,
                userRole,
                routeProps
              )
            }
            />



<Route
  exact
  path="/Action"
  render={() => <Action/>}
/>

<Route
    path="/Action"
            exact
            render={routeProps =>
              Authorization(
                Action,
                ["Admin","CEO/Director","Business Manager","Service Manager","Sales Manager","Sales Engineer","Service Engineer","Back Office Executive","Back Office Support","HR/ IT Manager","Operations Manager"],
                user,
                userRole,
                routeProps
              )
            }
            />


<Route
  exact
  path="/AddAction"
  render={() => <AddAction/>}
/>



<Route
  exact
  path="/EditAction"
  render={() => <EditAction/>}
/>

<Route
  exact
  path="/ViewAction"
  render={() => <ViewAction/>}
/>

<Route
  exact
  path="/ClientGodView"
  render={() => <ClientGodView/>}
/>

<Route
  exact
  path="/EditClient"
  render={() => <EditClient/>}
/>

{/*
<Route
  exact
  path="/EditTransmute"
  render={() => <EditTransmute/>}
/>

*/}

<Route
  exact
  path="/EditBillingInfo"
  render={() => <EditBillingInfo/>}
/>


<Route
  exact
  path="/ViewClient"
  render={() => <ViewClient/>}
/>

<Route
  exact
  path="/ViewTransmute"
  render={() => <ViewTransmute/>}
/>


<Route
  exact
  path="/EditVendor"
  render={() => <EditVendor/>}
/>

<Route
  exact
  path="/ViewBillindaddr"
  render={() => <ViewBillindaddr/>}
/>

<Route
  exact
  path="/EditVendorTransmute"
  render={() => <EditVendorTransmute/>}
/>

<Route
  exact
  path="/EditVendorBillingInfo"
  render={() => <EditVendorBillingInfo/>}
/>

<Route
  exact
  path="/ViewVendorTransmute"
  render={() => <ViewVendorTransmute/>}
/>


<Route
  exact
  path="/ViewVendorBillindaddr"
  render={() => <ViewVendorBillindaddr/>}
/>

<Route
    path="/DocumentManagement"
            exact
            render={()=><DMS/>}
            />


<Route
           path="/AddDMS"
            exact
            render={()=><AddDMS/>}
            />

            <Route
            path="/EditDMS"
            exact
            render={()=><EditDMS/>}
            />

                <Route
                path="/ViewDMS"
            exact
            render={()=><ViewDMS/>}
            />


<Route
    path="/InvoiceGodView"
            exact
            render={()=><InvoiceGodView/>}
            />

            <Route
            path="/AddInvoice"
            exact
            render={()=><AddInvoice/>}
            />

             <Route
            path="/InvoiceBill"
            exact
            render={()=><InvoiceBill/>}
            />

             <Route
            path="/Cart"
            exact
            render={()=><Cart/>}
            />

              <Route
            path="/PaymentBill"
            exact
            render={()=><PaymentBill/>}
            />




            {/*Quotation*/}


<Route
    path="/QuotationGodView"
            exact
            render={()=><QuotationGodView/>}
            />

            <Route
            path="/QuoatationInvoice"
            exact
            render={()=><QuoatationInvoice/>}
            />

             <Route
            path="/QuoatationBill"
            exact
            render={()=><QuoatationBill/>}
            />

             <Route
            path="/QuoatationCart"
            exact
            render={()=><QuoatationCart/>}
            />

              <Route
            path="/QuotationBillpay"
            exact
            render={()=><QuotationBillpay/>}
            />



              {/*Purchase Order*/}


<Route
    path="/PurchaseOrderGodView"
            exact
            render={()=><PurchaseOrderGodView/>}
            />

            <Route
            path="/PurchaseOrderInvoice"
            exact
            render={()=><PurchaseOrderInvoice/>}
            />

             <Route
            path="/PurchaseOrderBill"
            exact
            render={()=><PurchaseOrderBill/>}
            />

             <Route
            path="/PurchaseOrderCart"
            exact
            render={()=><PurchaseOrderCart/>}
            />

              <Route
            path="/PurchaseOrderPaymentBill"
            exact
            render={()=><PurchaseOrderPaymentBill/>}
            />


             {/*Performa Order*/}


<Route
    path="/PerformaGodView"
            exact
            render={()=><PerformaGodView/>}
            />

            <Route
            path="/PerformaInvoice"
            exact
            render={()=><PerformaInvoice/>}
            />

             <Route
            path="/PerformaeBill"
            exact
            render={()=><PerformaeBill/>}
            />

             <Route
            path="/PerformaCart"
            exact
            render={()=><PerformaCart/>}
            />

              <Route
            path="/PerformaBillpayment"
            exact
            render={()=><PerformaBillpayment/>}
            />


             {/*Service Order*/}




<Route
    path="/ServiceOrderGodView"
            exact
            render={()=><ServiceOrderGodView/>}
            />

            <Route
            path="/ServiceOrderInvoice"
            exact
            render={()=><ServiceOrderInvoice/>}
            />

             <Route
            path="/ServiceOrderBill"
            exact
            render={()=><ServiceOrderBill/>}
            />

             <Route
            path="/ServiceOrderCart"
            exact
            render={()=><ServiceOrderCart/>}
            />

              <Route
            path="/ServiceOrderPaymentBill"
            exact
            render={()=><ServiceOrderPaymentBill/>}
            />


            <Route
            path="/Setting"
            exact
            render={()=><Setting/>}
            />

            <Route
            path="/Contract"
            exact
            render={()=><ContractGodsView/>}
            />

            <Route
            path="/AddContract"
            exact
            render={()=><AddContract/>}
            />

            <Route
            path="/EditContract"
            exact
            render={()=><EditContract/>}
            />

            <Route
            path="/ViewContract"
            exact
            render={()=><ViewContract/>}
            />

            <Route
            path="/LeadMgmt"
            exact
            render={()=><LeadGodsView/>}
            />
            <Route
            path="/AddLeadMgmt"
            exact
            render={()=><LeadAdd/>}
            />
            <Route
            path="/EditLeadMgmt"
            exact
            render={()=><LeadEdit/>}
            />
            <Route
            path="/ViewLeadMgmt"
            exact
            render={()=><LeadView/>}
            />

            <Route
            path="/DashBoard"
            exact
            render={()=><DashBoard/>}
            />

          

 {/*



 <Route
    path="/DashBoard"
            exact
            render={routeProps =>
              Authorization(
                DashBoard,
                ["Admin","CEO/Director","Business Manager","Service Manager","Sales Manager",Back Office Executive","HR/ IT Manager","Operations Manager"],
                user,
                userRole,
                routeProps
              )
            }
            />

*/}

</Switch>

{/*
<Router>
<div className="App">

      </div>
      </Router>

      
      */}
</div>
    );
  }
}

export default App;
