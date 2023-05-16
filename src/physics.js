var air_density = 1.22;
var sx = 1.71;
//viper=1.91 but if set to 1.91 lacks topspeed
//var rolling_resistance;

export const acceleration_calc = function(speed, power, weight, cx, rolling_resistance, maxg) {
    var piki = pushforce(speed, power) - aero_drag(speed, cx) - rolling_drag(speed, rolling_resistance, weight);
    piki = piki / weight /1000;
    if (piki > maxg/100)//to je ta max G pospešek na začetku
        piki = maxg/100;

    return piki;
}

export const aero_drag = function(speed, cx)
{
    var piki = air_density * speed * speed * cx * sx / 2;
    return piki;//
}

export const rolling_drag = function(speed, rolling_resistance, weight)
{
    var piki = rolling_resistance * weight * 9.81;
    return piki;
}

export const pushforce = function(speed, power)
{
    var piki = power * 0.95 *525 / speed;//0.95 je transmission efficency  525 je hp -> kW * 1000 zaradi kilo
    return piki;
}

export const sample = function() {
    console.warn('physics')
}
