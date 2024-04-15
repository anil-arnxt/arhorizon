import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Register from "./pages/Register";
import ProductId from "./pages/ProductId";
import Editor from "./pages/Editor";
import EditorTap from "./pages/EditorTap";

import "./App.css";
import Analytics from "./pages/Analytics";
import Stats from "./pages/Stats";
import Upload from "./pages/Upload";
import CouponCode from "./pages/CouponCode";
import OTPScreen from "./pages/OTPScreen";
import Ar from "./pages/Ar";
import TapUpload from "./pages/TapUpload";
import EditorVideo from "./pages/EditorVideo";
import VideoUpload from "./pages/VideoUpload";
import Test from "./pages/Test";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Register />} />
        <Route path="/productid/:id" element={<ProductId />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/editorTap" element={<EditorTap />} />
        <Route path="/editorVideo" element={<EditorVideo />} />

        <Route path="/analytics" element={<Analytics />} />
        <Route path="/analytics/:id" element={<Stats />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/upload_tap_to_place" element={<TapUpload />} />
        <Route path="/upload_video_based_ar" element={<VideoUpload />} />

        <Route path="/couponCode/:id" element={<CouponCode />} />
        <Route path="/couponCodeOTP/:id" element={<OTPScreen />} />
        <Route path="/arjs" element={<Ar />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
