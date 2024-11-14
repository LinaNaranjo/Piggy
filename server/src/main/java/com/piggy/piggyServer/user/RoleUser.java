package com.piggy.piggyServer.user;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum RoleUser {
  PARENT, CHILD;

  @JsonCreator
  public static RoleUser fromString(String role) {
    return role != null ? RoleUser.valueOf(role.toUpperCase()) : null;
  }

  @JsonValue
  public String toValue() {
    return name().toLowerCase();
  }
}