import React from "react";
import { create } from "react-test-renderer";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

describe("ProfileStatus component", () => {
    test("Status from props should be in the state", () => {
      const component = create(<ProfileStatus status="MY STATUS" />);
      const instance = component.getInstance();
      expect(instance.status).toBe("MY STATUS");
    });
  });