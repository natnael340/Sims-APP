export const status = (data) => {
  let bar = {};
  let barRes = {};
  let gpa;
  let sum = 0;
  let tcp = 0;
  for (let d in data) {
    sum += data[d].sgpa * data[d].cp;
    tcp += data[d].cp;
    if (bar[data[d].year] == undefined) {
      bar[data[d].year] = { gpa: data[d].sgpa, cp: data[d].cp };
      barRes[data[d].year] = data[d].sgpa;
    } else {
      bar[data[d].year] = [
        bar[data[d].year],
        { gpa: data[d].sgpa, cp: data[d].cp },
      ];
      barRes[data[d].year] = (
        (bar[data[d].year][0].gpa * bar[data[d].year][0].cp +
          bar[data[d].year][1].gpa * bar[data[d].year][1].cp) /
        (bar[data[d].year][0].cp + bar[data[d].year][1].cp)
      ).toFixed(2);
    }
  }
  let a = {};
  for (let key in barRes) {
    let x =
      key == 1
        ? key + "st"
        : key == 2
        ? key + "nd"
        : key == 3
        ? key + "rd"
        : key + "th";
    a[x] = barRes[key];
  }
  let c = { labels: Object.keys(a), datasets: [{ data: Object.values(a) }] };
  gpa = (sum / tcp).toFixed(2);
  return [c, gpa];
};

export const Sectioned = (data, typo) => {
  let d = [];
  for (let da in data) {
    let breaks = false;
    for (let x in d) {
      if (d[x].title === data[da][typo]) {
        d[x].data = [...d[x].data, data[da]];
        breaks = true;
      }
    }
    if (!breaks)
      d.push({
        title: data[da][typo],
        data: [data[da]],
      });
  }
  return d;
};
export const getGradesExpand = (data) => {
  let n = {};
  for (let x in data) {
    n[String(data[x].year) + String(data[x].semseter)] = "collapsed";
  }
  return n;
};

export const getCourses = (data) => {
  let c = Sectioned(data, "year");

  let sgpa = {};
  let taken = 0;
  for (let n in c) {
    c[n].data = Sectioned(c[n].data, "semseter");
    for (let i in c[n].data) {
      let sum = 0;
      for (let x in c[n].data[i].data) {
        sum += c[n].data[i].data[x].cp;
        if (c[n].data[i].data[x].grade != "") taken++;
      }
      sgpa[String(c[n].title) + String(c[n].data[i].title)] = sum;
    }
  }
  let r = { total: data.length, taken: taken };
  return [c, sgpa, r];
};

export const SortData = (data) => {
  data.sort((a, b) =>
    a.year > b.year
      ? 1
      : a.year < b.year
      ? -1
      : a.semseter > b.semseter
      ? 1
      : -1
  );
  return data;
};
const _ = require("lodash");
export const compare = (privious, next) => {
  let data = {};
  for (let j in privious) {
    if (!_.isEqual(privious[j], next[j])) {
      data["update"] =
        data?.update != undefined ? [...data.update, next[j]] : [next[j]];
    }
  }
  if (privious.length < next.length)
    data["new"] = [...next.slice(privious.length, next.length)];
  return data;
};
