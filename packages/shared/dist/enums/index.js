"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseStatus = exports.VerificationStatus = exports.ProposalStatus = exports.JobStatus = exports.PaymentStatus = exports.UserRole = void 0;
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "ADMIN";
    UserRole["STUDENT"] = "STUDENT";
    UserRole["TEACHER"] = "TEACHER";
    UserRole["EMPLOYER"] = "EMPLOYER";
    UserRole["FREELANCER"] = "FREELANCER";
})(UserRole || (exports.UserRole = UserRole = {}));
var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus["PENDING"] = "PENDING";
    PaymentStatus["APPROVED"] = "APPROVED";
    PaymentStatus["REJECTED"] = "REJECTED";
})(PaymentStatus || (exports.PaymentStatus = PaymentStatus = {}));
var JobStatus;
(function (JobStatus) {
    JobStatus["POSTED"] = "POSTED";
    JobStatus["ACTIVE"] = "ACTIVE";
    JobStatus["SUBMITTED"] = "SUBMITTED";
    JobStatus["COMPLETED"] = "COMPLETED";
    JobStatus["REJECTED"] = "REJECTED";
    JobStatus["DISPUTED"] = "DISPUTED";
})(JobStatus || (exports.JobStatus = JobStatus = {}));
var ProposalStatus;
(function (ProposalStatus) {
    ProposalStatus["PENDING"] = "PENDING";
    ProposalStatus["ACCEPTED"] = "ACCEPTED";
    ProposalStatus["REJECTED"] = "REJECTED";
})(ProposalStatus || (exports.ProposalStatus = ProposalStatus = {}));
var VerificationStatus;
(function (VerificationStatus) {
    VerificationStatus["PENDING"] = "PENDING";
    VerificationStatus["VERIFIED"] = "VERIFIED";
    VerificationStatus["REJECTED"] = "REJECTED";
})(VerificationStatus || (exports.VerificationStatus = VerificationStatus = {}));
var CourseStatus;
(function (CourseStatus) {
    CourseStatus["DRAFT"] = "DRAFT";
    CourseStatus["PENDING_APPROVAL"] = "PENDING_APPROVAL";
    CourseStatus["PUBLISHED"] = "PUBLISHED";
    CourseStatus["REJECTED"] = "REJECTED";
})(CourseStatus || (exports.CourseStatus = CourseStatus = {}));
