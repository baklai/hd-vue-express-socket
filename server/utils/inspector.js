module.exports = (apiOrigin, apiPath = '/inspector') => {
  const SERVER_API_ROUTE = apiOrigin + apiPath;

  const vbs = `
      'https://docs.microsoft.com/en-us/windows/win32/wmisdk/wmi-start-page

      'On Error Resume Next

      postJSON "${SERVER_API_ROUTE}?field=baseboard", WMI("select SerialNumber from Win32_BaseBoard")
      postJSON "${SERVER_API_ROUTE}?field=bios", WMI("select SerialNumber,Version from Win32_BIOS")
      postJSON "${SERVER_API_ROUTE}?field=os", WMI("select CSName,Caption,OSArchitecture,Version from Win32_OperatingSystem")
      postJSON "${SERVER_API_ROUTE}?field=cpu", WMI("select Name,CurrentClockSpeed,NumberOfCores,NumberOfLogicalProcessors,Architecture,Manufacturer from Win32_Processor")
      postJSON "${SERVER_API_ROUTE}?field=memorychip", WMI("select Capacity,Speed,Manufacturer,Description from Win32_PhysicalMemory")
      postJSON "${SERVER_API_ROUTE}?field=diskdrive", WMI("select Description,Caption,Size,SerialNumber,Manufacturer from Win32_DiskDrive")
      postJSON "${SERVER_API_ROUTE}?field=netadapter", WMI("select NetConnectionID,AdapterType,Name,Description,Manufacturer,MACAddress from Win32_NetworkAdapter")
      postJSON "${SERVER_API_ROUTE}?field=useraccount", WMI("select Name,Description,Disabled from Win32_UserAccount")
      postJSON "${SERVER_API_ROUTE}?field=useradmin", WMI_UsersAdmin()
      postJSON "${SERVER_API_ROUTE}?field=share", WMI("select Name,Type,Path,Description from Win32_Share")
      postJSON "${SERVER_API_ROUTE}?field=printer", WMI("select Name from Win32_Printer")
      postJSON "${SERVER_API_ROUTE}?field=product", WMI("select Name,Vendor,Version,InstallDate from Win32_Product")

      function WMI(ByVal aQuery)
        dim objIndex, arrIndex, objJSON
        set objWMIService = GetObject("winmgmts:")
        set objItems = objWMIService.ExecQuery(aQuery)
        arrIndex = 0
        objJSON = "["
        for each process in objItems
          objIndex = 0
          arrIndex = arrIndex + 1
          objJSON = objJSON + "{"
          for each property in process.properties_
            objIndex = objIndex + 1
            if VarType(property.value) <> 8204 Then
              if IsNull(property.value) Then
                objJSON = objJSON + Qu(property.name) & ":" & Qu("")
              else
                objJSON = objJSON + Qu(property.name) & ":" & Qu(property.value)
              end if
              if objIndex < process.properties_.count then
                objJSON = objJSON + ","
              end if
            end if
          next
          objJSON = objJSON + "}"
          if arrIndex < objItems.count then
            objJSON = objJSON + ","
          end if
        next
        objJSON = objJSON + "]"
        WMI = objJSON
      end function

      function WMI_UsersAdmin()
        dim objJSON, objWMIService, groupCollection, groupUserCollection, objItemA, objItemB
        set objWMIService = GetObject("winmgmts:")
        set groupCollection = objWMIService.ExecQuery("SELECT SID FROM Win32_Group")
        set groupUserCollection = objWMIService.ExecQuery("SELECT * FROM Win32_GroupUser")
        objJSON = "["
        for each objItemA In groupCollection
          if objItemA.SID = "S-1-5-32-544" Then
            for each objItemB In groupUserCollection
              if InStrRev(objItemB.GroupComponent, "Name=" & """" & objItemA.Name & """", -1, vbTextCompare) > 0 Then
                objJSON = objJSON + Qu(Replace(Split(objItemB.PartComponent, "Name=", -1,  vbTextCompare)(1), """", "")) + ","
              end if
            next
          end If
        next
        objJSON = Left(objJSON, Len(objJSON) -1) + "]"
        WMI_UsersAdmin = objJSON
      end function

      function postJSON (url, json)
        set objHTTP = CreateObject("Microsoft.XMLHTTP")
        objHTTP.Open "POST", url, False
        objHTTP.setRequestHeader "User-Agent", "Mozilla/4.0"
        objHTTP.setRequestHeader "Content-Type", "application/json; charset=UTF-8"
        objHTTP.setRequestHeader "CharSet", "charset=UTF-8"
        objHTTP.setRequestHeader "Accept", "application/json"
        objHTTP.send (json)
        if objHTTP.Status >= 400 And objHTTP.Status <= 599 Then
          postJSON = false
        else
          postJSON = true
        end if
      end function

      function Qu(ByVal value)
        Qu = value
        select case VarType(value)
          case vbObject
            Qu = Chr(34) & "-" & Chr(34)
          case vbString
            Qu = Chr(34) & CStr(JSON(value, false)) & Chr(34)
          case vbBoolean
            if value then Qu = 1 else Qu = 0 end if
        end select
      end function

      function JSON(ByVal str, ByVal mode)
        dim key, val
        set d = CreateObject("Scripting.Dictionary")
        d.Add "\\\/", "/"
        d.Add "'", Chr(34)
        d.Add "\\b", Chr(8)
        d.Add "\\f", Chr(12)
        d.Add "\\n", Chr(10)
        d.Add "\\r", Chr(13)
        d.Add "\\t", Chr(9)
        if mode then
          d.Add "\\""", """"
          d.Add "\\\\", "\\"
          div = "\\\\"
          cat = "\\"
          key = d.Keys
          val = d.Items
        else
          d.Add "\\\\", "\\"
          d.Add "\\""", "''"
          div = "\\"
          cat = "\\\\"
          key = d.Items
          val = d.Keys
        end if
        arr = Split(str, div)
        for i = 0 to UBound(arr)
          for j = 0 to UBound(key)
            arr(i) = Replace(arr(i), key(j), val(j))
          next
          output = output & arr(i)
          if i <> UBound(arr) then output = output & cat
        next
        d.RemoveAll
        JSON = output
      end function

      'Copyright © ${new Date().getFullYear()} Dmitrii Baklai. All rights reserved.`;

  return vbs;
};
