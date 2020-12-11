var total_points = 0;

function getPunctuationSingle(distance) {
    var points = 1000 - (distance * 50);
    points = Math.round(points);
    if (zoom_clue > 12) points -= zoom_clue * 30;
    if (points < 0) points = 0;
    total_points += points;
    return points;
}

function resetPoints() {
    total_points = 0;
}