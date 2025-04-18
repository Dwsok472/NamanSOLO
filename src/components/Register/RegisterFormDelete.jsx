import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useRegisterStore } from "../api2";

function RegisterFormDelete(fDa) {
  const navigate = useNavigate();
  const location = useLocation();
  const { deleteForm } = useRegisterStore();

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (!fDa) return;
      e.preventDefault();
      e.returnValue = "";
    };

    const unblock = navigate.block((tx) => {
      if (!fDa) return unblock();

      const confirmLeave = window.confirm(
        "다른 페이지로 이동하시면 지금까지 작성하신 정보는 모두 삭제됩니다. 그래도 이동하겠습니까?"
      );
      if (confirmLeave) {
        deleteForm();
        unblock();
        tx.retry(); // 이동 강행
      }
    });

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      unblock();
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [navigate, location, fDa, deleteForm]);
}

export default RegisterFormDelete;