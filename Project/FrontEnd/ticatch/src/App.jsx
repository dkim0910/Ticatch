import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import OrderPage from "./OrderPage/OrderPage";
import { CheckoutPage } from "./TossPayments/Checkout";
import { SuccessPage } from "./TossPayments/Success";

import TestDatePage from "./TestDataPage/TestDataPage";
import MainPage from "./TestDataPage/MainPage/MainPage";
import DeatailPage from "./TestDataPage/DetailPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/order" element={<OrderPage />} />
        <Route path="/order/checkout" element={<CheckoutPage />} />
        <Route path="/order/success" element={<SuccessPage />} />
        {/* 이 아래로 테스트 페이지 */}
        <Route path="/order/testDatePage" element={<TestDatePage />} />
        <Route path="/mainPage" element={<MainPage />} />
        <Route path="/detail/:seqPfjoinId/view" element={<DeatailPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
